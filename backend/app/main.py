from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
from .config import settings
from .database import engine, get_db
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
    same_site="none",
    https_only=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ghostmark.sahilmishra.dev"],
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


@app.get("/warmup")
def warmup(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "warm"}
    except Exception as e:
        import logging
        logging.error(f"Warmup error: {str(e)}", exc_info=True)
        return {"status": "error", "error": str(e)}


@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    import time
    start_time = time.time()
    db.execute("SELECT 1")
    end_time = time.time()
    latency_ms = round((end_time - start_time) * 1000, 2)
    return {
        "status": "ok",
        "latency_ms": latency_ms,
        "message": f"Database query took {latency_ms}ms"
    }


@app.get("/simple-test")
def simple_test():
    return {"status": "ok", "message": "Simple test without database"}