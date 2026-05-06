from fastapi import APIRouter, Depends, Body, status, HTTPException, Response
from sqlalchemy.orm import Session, joinedload
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID

from app.database import get_db
from app.models import Bookmark, Folder, Tag
from app.schemas import BookmarkCreate as BookmarkSchema, BookmarkPut, BookmarkResponse
from app.utils.jwt import verify_access_token

security = HTTPBearer()

router = APIRouter(
    prefix="/v1/bookmarks",
    tags=["bookmarks"],
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    payload = verify_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload


def handle_tags(db: Session, bookmark: Bookmark, tags: list[str]):
    bookmark.tags.clear()

    for tag_name in tags:
        tag_name = tag_name.lower().strip().replace("#", "")
        if not tag_name:
            continue

        tag = db.query(Tag).filter(Tag.name == tag_name).first()

        if not tag:
            tag = Tag(name=tag_name)
            db.add(tag)
            db.flush()

        bookmark.tags.append(tag)


@router.post(
    "/folders/{folder_id}/bookmarks",
    response_model=BookmarkResponse,
    status_code=status.HTTP_201_CREATED
)
def create_bookmark(
    folder_id: UUID,
    bookmark: BookmarkSchema = Body(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    new_bookmark = Bookmark(
        title=bookmark.title,
        url=str(bookmark.url),
        description=bookmark.description,
        favorite=bookmark.favorite,
        folder_id=folder_id
    )

    if bookmark.tags:
        handle_tags(db, new_bookmark, bookmark.tags)

    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)

    return new_bookmark


@router.put(
    "/folders/{folder_id}/bookmarks/{bookmark_id}",
    response_model=BookmarkResponse
)
def update_bookmark(
    folder_id: UUID,
    bookmark_id: UUID,
    bookmark: BookmarkPut = Body(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    existing = db.query(Bookmark).join(Folder).filter(
        Bookmark.id == bookmark_id,
        Bookmark.folder_id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    update_data = bookmark.model_dump(exclude_unset=True)

    if "url" in update_data:
        update_data["url"] = str(update_data["url"])

    tags = update_data.pop("tags", None)

    db.query(Bookmark).filter(Bookmark.id == bookmark_id).update(
        update_data, synchronize_session=False
    )

    db.commit()
    db.refresh(existing)

    if tags is not None:
        handle_tags(db, existing, tags)
        db.commit()
        db.refresh(existing)

    return existing


@router.delete(
    "/folders/{folder_id}/bookmarks/{bookmark_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_bookmark(
    folder_id: UUID,
    bookmark_id: UUID,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    bookmark = db.query(Bookmark).join(Folder).filter(
        Bookmark.id == bookmark_id,
        Bookmark.folder_id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    db.query(Bookmark).filter(Bookmark.id == bookmark_id).delete(
        synchronize_session=False
    )
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get(
    "/favorites",
    response_model=list[BookmarkResponse]
)
def get_favorite_bookmarks(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    bookmarks = db.query(Bookmark).join(Folder).options(
        joinedload(Bookmark.tags)
    ).filter(
        Bookmark.favorite == True,
        Folder.user_id == user_id
    ).all()

    return bookmarks


@router.get("/allbookmarks", response_model=list[BookmarkResponse])
def get_all_bookmarks(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["user_id"]

    bookmarks = db.query(Bookmark).join(Folder).options(
        joinedload(Bookmark.tags)
    ).filter(
        Folder.user_id == user_id
    ).all()

    return bookmarks
