from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Table   # ✅ ADDED Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .database import Base
import hashlib


class Folder(Base):
    __tablename__ = "folders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True)
    description = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    user = relationship("User", back_populates="folders")
    bookmarks = relationship(
        "Bookmark",
        back_populates="folder",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Folder(id={self.id}, name='{self.name}', user_id={self.user_id})>"


bookmark_tags = Table(
    "bookmark_tags",
    Base.metadata,
    Column("bookmark_id", UUID(as_uuid=True), ForeignKey("bookmarks.id", ondelete="CASCADE"), index=True),
    Column("tag_id", UUID(as_uuid=True), ForeignKey("tags.id", ondelete="CASCADE"), index=True),
)


class Tag(Base):
    __tablename__ = "tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)

    def __repr__(self):
        return f"<Tag(name='{self.name}')>"


class Bookmark(Base):
    __tablename__ = "bookmarks"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, index=True)
    url = Column(String, index=True)
    description = Column(String)
    favorite = Column(Boolean, default=False, index=True)

    folder_id = Column(UUID(as_uuid=True), ForeignKey("folders.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    folder = relationship("Folder", back_populates="bookmarks")

    tags = relationship("Tag", secondary=bookmark_tags, backref="bookmarks")

    def __repr__(self):
        return f"<Bookmark(id={self.id}, title='{self.title}')>"


class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    profile_picture = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    folders = relationship(
        "Folder",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    tokens = relationship(
        "RefreshToken",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)

    token = Column(String(512), nullable=False, unique=True, index=True)
    is_revoked = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    user = relationship("User", back_populates="tokens")

    @staticmethod
    def hash_token(token: str) -> str:
        return hashlib.sha256(token.encode()).hexdigest()

    def __repr__(self):
        return f"<RefreshToken(id={self.id}, user_id={self.user_id}, revoked={self.is_revoked})>"