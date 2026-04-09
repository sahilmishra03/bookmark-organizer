from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from .database import Base

class Folder(Base):
    __tablename__ = "folders"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    
    def __repr__(self):
        return f"<Folder(id={self.id}, name='{self.name}', description='{self.description}')>"
    
class Bookmark(Base):
    __tablename__ = "bookmarks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String, index=True)
    description = Column(String)
    favorite = Column(Boolean, default=False, index=True)
    folder_id = Column(Integer, ForeignKey("folders.id", ondelete="CASCADE"), index=True)
    
    def __repr__(self):
        return f"<Bookmark(id={self.id}, title='{self.title}', url='{self.url}', description='{self.description}', favorite={self.favorite}, folder_id={self.folder_id})>"