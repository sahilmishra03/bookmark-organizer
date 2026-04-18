from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from enum import Enum

from app.database import get_db
from app.models import Bookmark, Folder
from app.schemas import BookmarkResponse
from app.utils.jwt import verify_access_token

security = HTTPBearer()

router = APIRouter(
    prefix="/v1/search",
    tags=["search"],
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    payload = verify_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


class SearchType(str, Enum):
    partial = "partial"
    exact = "exact"
    case_sensitive = "case_sensitive"
    first_letter = "first_letter"


@router.get("/bookmarks", response_model=list[BookmarkResponse])
def search_bookmarks(
    folder_name: str | None = Query(None),
    bookmark_title: str | None = Query(None),
    search_type: SearchType = Query(SearchType.partial),
    limit: int = Query(20, le=100),
    offset: int = Query(0),

    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Search bookmarks using folder name and/or bookmark title.
    """

    user_id = user["user_id"]

    if not folder_name and not bookmark_title:
        raise HTTPException(
            status_code=400,
            detail="Provide folder_name or bookmark_title"
        )

    query = db.query(Bookmark).join(Folder).filter(
        Folder.user_id == user_id
    )

    if folder_name:
        if search_type == SearchType.partial:
            query = query.filter(Folder.name.ilike(f"%{folder_name}%"))
        elif search_type == SearchType.exact:
            query = query.filter(Folder.name == folder_name)
        elif search_type == SearchType.case_sensitive:
            query = query.filter(Folder.name.like(f"%{folder_name}%"))
        elif search_type == SearchType.first_letter:
            query = query.filter(Folder.name.like(f"{folder_name}%"))

    if bookmark_title:
        if search_type == SearchType.partial:
            query = query.filter(Bookmark.title.ilike(f"%{bookmark_title}%"))
        elif search_type == SearchType.exact:
            query = query.filter(Bookmark.title == bookmark_title)
        elif search_type == SearchType.case_sensitive:
            query = query.filter(Bookmark.title.like(f"%{bookmark_title}%"))
        elif search_type == SearchType.first_letter:
            query = query.filter(Bookmark.title.like(f"{bookmark_title}%"))

    return query.offset(offset).limit(limit).all()