from fastapi import APIRouter, Depends, Body, status, HTTPException, Response
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID

from app.database import get_db
from app.models import Bookmark, Folder
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
    """Create a bookmark inside a folder (user-protected)."""

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
    """Update bookmark (only if user owns it)."""

    user_id = user["user_id"]

    # Validate folder ownership
    folder = db.query(Folder).filter(
        Folder.id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    # Validate bookmark exists and user owns it
    existing = db.query(Bookmark).join(Folder).filter(
        Bookmark.id == bookmark_id,
        Bookmark.folder_id == folder_id,
        Folder.user_id == user_id
    ).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    # Update the bookmark using a separate query without join
    update_data = bookmark.model_dump()
    if 'url' in update_data:
        update_data['url'] = str(update_data['url'])
    
    db.query(Bookmark).filter(Bookmark.id == bookmark_id).update(
        update_data, synchronize_session=False
    )

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
    """Delete bookmark (only if user owns it)."""

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
    """Get all favorite bookmarks for logged-in user."""

    user_id = user["user_id"]

    bookmarks = db.query(Bookmark).join(Folder).filter(
        Bookmark.favorite == True,
        Folder.user_id == user_id
    ).all()

    return bookmarks

@router.get("/allbookmarks", response_model=list[BookmarkResponse])
def get_all_bookmarks(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all bookmarks for logged-in user."""

    user_id = user["user_id"]

    bookmarks = db.query(Bookmark).join(Folder).filter(
        Folder.user_id == user_id
    ).all()

    return bookmarks