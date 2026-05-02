from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session
from bs4 import BeautifulSoup
from uuid import uuid4
import time

from app.database import get_db
from app.models import Bookmark, Folder, Tag
from app.utils.jwt import verify_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/v1/import-export", tags=["import-export"])
security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


# =========================================================
# IMPORT HTML (CHROME FORMAT SUPPORT)
# =========================================================
@router.post("/import/html")
async def import_html_bookmarks(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    if not file.filename.endswith(".html"):
        raise HTTPException(status_code=400, detail="Upload a valid HTML file")

    content = await file.read()
    soup = BeautifulSoup(content, "html.parser")

    created_count = 0
    folder_cache = {}
    tag_cache = {}

    def get_or_create_folder(name: str, parent_folder=None):
        # Create a unique key for caching
        cache_key = f"{parent_folder.name} > {name}" if parent_folder else name
        if cache_key in folder_cache:
            return folder_cache[cache_key]

        folder = db.query(Folder).filter(
            Folder.name == name,
            Folder.user_id == user_id
        ).first()

        if not folder:
            folder = Folder(
                id=uuid4(),
                name=name,
                user_id=user_id
            )
            db.add(folder)
            db.flush()

        folder_cache[cache_key] = folder
        return folder

    def get_or_create_tag(name: str):
        if name in tag_cache:
            return tag_cache[name]

        tag = db.query(Tag).filter(Tag.name == name).first()
        if not tag:
            tag = Tag(name=name)
            db.add(tag)
            db.flush()

        tag_cache[name] = tag
        return tag

    def process_dl(dl, parent_folder=None):
        nonlocal created_count

        # Get only DTs that are direct children of this DL (or its <p> wrapper)
        processed_dts = set()

        for dt in dl.find_all("dt"):
            # Skip if this DT belongs to a nested DL (not our level)
            parent = dt.find_parent("dl")
            if parent != dl:
                continue
            
            if id(dt) in processed_dts:
                continue
            processed_dts.add(id(dt))

            h3 = dt.find("h3", recursive=False)
            a = dt.find("a", recursive=False)

            # FOLDER
            if h3:
                folder_name = h3.text.strip()
                if folder_name.lower() in ["bookmarks bar", "bookmarks"]:
                    inner_dl = dt.find("dl")
                    if inner_dl:
                        process_dl(inner_dl, parent_folder)
                    continue

                current_folder = get_or_create_folder(folder_name, parent_folder)
                inner_dl = dt.find("dl")
                if inner_dl:
                    process_dl(inner_dl, current_folder)

            # BOOKMARK
            elif a:
                title = a.text.strip()
                url = a.get("href")
                if not url:
                    continue

                if parent_folder is not None:
                    exists = db.query(Bookmark).join(Folder).filter(
                        Bookmark.url == url,
                        Folder.user_id == user_id
                    ).first()
                else:
                    exists = db.query(Bookmark).filter(
                        Bookmark.url == url,
                        Bookmark.folder_id == None
                    ).first()

                if exists:
                    continue

                bookmark = Bookmark(
                    id=uuid4(),
                    title=title,
                    url=url,
                    description=title,
                    favorite=False,
                    folder_id=parent_folder.id if parent_folder else None
                )
                if parent_folder:
                    tag = get_or_create_tag(parent_folder.name.lower())
                    bookmark.tags.append(tag)

                db.add(bookmark)
                created_count += 1

    root_dl = soup.find("dl")
    if not root_dl:
        raise HTTPException(status_code=400, detail="Invalid bookmark HTML format")

    process_dl(root_dl)
    db.commit()

    return {
        "message": "Import successful",
        "bookmarks_added": created_count
    }


# =========================================================
# EXPORT HTML (CHROME FORMAT)
# =========================================================
@router.get("/export/html")
def export_html_bookmarks(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    bookmarks = db.query(Bookmark).join(Folder).filter(
        Folder.user_id == user_id
    ).all()

    # group by folder
    folder_map = {}

    for b in bookmarks:
        folder_name = b.folder.name if b.folder else "Bookmarks"

        if folder_name not in folder_map:
            folder_map[folder_name] = []

        folder_map[folder_name].append(b)

    now = int(time.time())

    html = """<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
"""

    # root folder
    html += f'    <DT><H3 ADD_DATE="{now}" LAST_MODIFIED="{now}" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks bar</H3>\n'
    html += "    <DL><p>\n"

    for folder, items in folder_map.items():

        html += f'        <DT><H3 ADD_DATE="{now}" LAST_MODIFIED="{now}">{folder}</H3>\n'
        html += "        <DL><p>\n"

        for b in items:
            # Basic Chrome bookmark format without extra metadata
            html += f'            <DT><A HREF="{b.url}" ADD_DATE="{now}">{b.title}</A>\n'

        html += "        </DL><p>\n"

    html += "    </DL><p>\n"
    html += "</DL><p>"

    return Response(
        content=html,
        media_type="text/html",
        headers={
            "Content-Disposition": "attachment; filename=bookmarks.html"
        }
    )