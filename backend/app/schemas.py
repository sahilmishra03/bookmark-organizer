from pydantic import BaseModel, HttpUrl, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class FolderBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None


class FolderCreate(FolderBase):
    pass


class FolderResponse(FolderBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}


class BookmarkBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    url: HttpUrl
    description: Optional[str] = None
    favorite: bool = False


class BookmarkCreate(BookmarkBase):
    folder_id: UUID


class BookmarkResponse(BookmarkBase):
    id: UUID
    folder_id: UUID
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}