from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from .config import settings
from .database import engine
from . import models
from .routes import auth, protected, folders, bookmarks, search, tags, import_export
import alembic
# models.Base.metadata.create_all(bind=engine)  # Now using Alembic migrations

app = FastAPI(
    title="Bookmark Organizer API",
    version="1.0.0",
    redirect_slashes=False,
)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.secret_key,
    same_site="lax",
    https_only=False
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(protected.router)
app.include_router(folders.router)
app.include_router(bookmarks.router)
app.include_router(search.router)
app.include_router(tags.router)
app.include_router(import_export.router)

@app.get("/")
def root():
    return {"message": "API running 🚀"}