from pydantic import BaseModel

class Folder(BaseModel):
    name: str
    description: str

class FolderResponse(Folder):
    id: int
    model_config = {"from_attributes": True}

class Bookmark(BaseModel):
    title: str
    url: str
    description: str
    favorite: bool = False
    folder_id: int

class BookmarkCreate(BaseModel):
    title: str
    url: str
    description: str
    favorite: bool = False

class BookmarkResponse(Bookmark):
    id: int
    
    model_config = {"from_attributes": True}