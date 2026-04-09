from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routes import folders, bookmarks
from .config import settings


# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(folders.router)
app.include_router(bookmarks.router)

@app.get("/")
async def root():
    return {"message": "Hello World !"}