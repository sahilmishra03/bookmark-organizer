from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session, joinedload
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID

from app.database import get_db
from app.models import Folder as FolderModel, Bookmark as BookmarkModel
from app.schemas import FolderCreate, FolderResponse, BookmarkResponse
from app.utils.jwt import verify_access_token

security = HTTPBearer()

router = APIRouter(
    prefix="/v1/folders",
    tags=["folders"],
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    payload = verify_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload


@router.get("", response_model=list[FolderResponse])
def get_folders(user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all folders for current user."""
    return db.query(FolderModel).filter(
        FolderModel.user_id == user["user_id"]
    ).all()


@router.get("/{folder_id}", response_model=FolderResponse)
def get_folder(folder_id: UUID, user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get folder by ID (user protected)."""

    folder = db.query(FolderModel).filter(
        FolderModel.id == folder_id,
        FolderModel.user_id == user["user_id"]
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    return folder


@router.get("/{folder_id}/bookmarks", response_model=list[BookmarkResponse])
def get_folder_bookmarks(folder_id: UUID, user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all bookmarks inside a folder."""

    folder = db.query(FolderModel).filter(
        FolderModel.id == folder_id,
        FolderModel.user_id == user["user_id"]
    ).first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    return db.query(BookmarkModel).options(
        joinedload(BookmarkModel.tags)
    ).filter(
        BookmarkModel.folder_id == folder_id
    ).all()


@router.post("", status_code=201, response_model=FolderResponse)
def create_folder(folder: FolderCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Create a new folder."""

    db_folder = FolderModel(
        **folder.model_dump(),
        user_id=user["user_id"]
    )

    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)

    return db_folder


@router.put("/{folder_id}", response_model=FolderResponse)
def update_folder(folder_id: UUID, folder: FolderCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Update folder (user protected)."""

    query = db.query(FolderModel).filter(
        FolderModel.id == folder_id,
        FolderModel.user_id == user["user_id"]
    )

    existing = query.first()

    if not existing:
        raise HTTPException(status_code=404, detail="Folder not found")

    query.update(folder.model_dump(exclude_unset=True), synchronize_session=False)

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{folder_id}", status_code=204)
def delete_folder(folder_id: UUID, user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Delete folder (user protected)."""

    query = db.query(FolderModel).filter(
        FolderModel.id == folder_id,
        FolderModel.user_id == user["user_id"]
    )

    folder = query.first()

    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found")

    query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=204)