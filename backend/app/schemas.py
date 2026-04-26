from pydantic import BaseModel, HttpUrl, Field, field_validator
from typing import Optional, Union, List
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
    

class TagSchema(BaseModel):
    name: str
    model_config = {"from_attributes": True}


class BookmarkBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    url: HttpUrl
    description: Optional[str] = None
    favorite: bool = False


class BookmarkCreate(BookmarkBase):
    folder_id: UUID
    tags: List[str] = Field(default_factory=list)


class BookmarkPut(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    url: HttpUrl
    description: Optional[str] = None
    favorite: bool = False
    tags: List[str] = Field(default_factory=list)


class BookmarkUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    url: Optional[HttpUrl] = None
    description: Optional[str] = None
    favorite: Optional[bool] = None
    tags: Optional[List[str]] = None


class BookmarkResponse(BookmarkBase):
    id: UUID
    folder_id: UUID
    created_at: datetime
    updated_at: Optional[datetime]
    tags: List[str] = Field(default_factory=list)

    @field_validator("tags", mode="before")
    @classmethod
    def serialize_tags(cls, tags):
        if not tags:
            return []
        return [
            tag.name if hasattr(tag, "name") else str(tag)
            for tag in tags
        ]

    model_config = {"from_attributes": True}
