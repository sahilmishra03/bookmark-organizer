from fastapi import APIRouter, Depends, Query, Body, status, HTTPException, Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Bookmark, Folder
from app.schemas import BookmarkCreate as BookmarkSchema, BookmarkResponse

router = APIRouter(
    prefix="/bookmarks",
    tags=["bookmarks"],
)

@router.post("/folders/{folder_id}/bookmarks", status_code=status.HTTP_201_CREATED)
def create_bookmark(folder_id: int, bookmark: BookmarkSchema = Body(...), db: Session = Depends(get_db)):
    """
    Create a new bookmark in a specific folder.
    
    Args:
        folder_id: The ID of the folder to create the bookmark in
        bookmark: Bookmark data from request body
        db: Database session dependency
        
    Returns:
        The created bookmark with generated ID
        
    Raises:
        HTTPException: If folder with given ID is not found
    """
    # Check if folder exists first
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"folder with id: {folder_id} not found",
        )
    
    # Create new bookmark
    new_bookmark = Bookmark(
        title=bookmark.title,
        url=bookmark.url,
        description=bookmark.description,
        folder_id=folder_id
    )
    
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark

@router.put("/folders/{folder_id}/bookmarks/{bookmark_id}")
def update_bookmark(folder_id: int, bookmark_id: int, bookmark: BookmarkSchema = Body(...), db: Session = Depends(get_db)):
    """
    Update an existing bookmark in a specific folder.
    
    Args:
        folder_id: The ID of the folder containing the bookmark
        bookmark_id: The ID of the bookmark to update
        bookmark: Updated bookmark data from request body
        db: Database session dependency
        
    Returns:
        The updated bookmark
        
    Raises:
        HTTPException: If folder or bookmark with given ID is not found
    """
    # Check if folder exists first
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"folder with id: {folder_id} not found",
        )
    
    # Check if bookmark exists and belongs to the specified folder
    update_query = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.folder_id == folder_id)
    existing_bookmark = update_query.first()
    if existing_bookmark is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"bookmark with id: {bookmark_id} not found in folder {folder_id}",
        )
    update_query.update(bookmark.dict(exclude_unset=True), synchronize_session=False)
    db.commit()
    db.refresh(existing_bookmark)
    return existing_bookmark

@router.delete("/folders/{folder_id}/bookmarks/{bookmark_id}")
def delete_bookmark(folder_id: int, bookmark_id: int, db: Session = Depends(get_db)):
    """
    Delete a bookmark by ID from a specific folder.
    
    Args:
        folder_id: The ID of the folder containing the bookmark
        bookmark_id: The ID of the bookmark to delete
        db: Database session dependency
        
    Returns:
        Empty response with 204 No Content status
        
    Raises:
        HTTPException: If folder or bookmark with given ID is not found
    """
    # Check if folder exists first
    folder = db.query(Folder).filter(Folder.id == folder_id).first()
    if folder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"folder with id: {folder_id} not found",
        )
    
    # Check if bookmark exists and belongs to the specified folder
    bookmark_query = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.folder_id == folder_id)
    bookmark = bookmark_query.first()
    if bookmark is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"bookmark with id: {bookmark_id} not found in folder {folder_id}",
        )
    bookmark_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get("/search", response_model=list[BookmarkResponse])
def search_bookmarks(
    folder_name: str = Query(None, description="Search bookmarks by folder name"),
    bookmark_title: str = Query(None, description="Search bookmarks by bookmark title"),
    search_type: str = Query("partial", description="Search type: 'partial' (case-insensitive), 'exact', 'case_sensitive', 'first_letter'"),
    db: Session = Depends(get_db)
):
    """
    Search bookmarks based on folder name and/or bookmark title with different search modes.
    
    Args:
        folder_name: Optional string to search for in folder names
        bookmark_title: Optional string to search for in bookmark titles
        search_type: Type of search to perform:
                    - 'partial': Case-insensitive partial match (default)
                    - 'exact': Exact case-sensitive match
                    - 'case_sensitive': Case-sensitive partial match
                    - 'first_letter': Match only first letter (case-sensitive)
        db: Database session dependency
        
    Returns:
        List of bookmarks matching the search criteria
        
    Raises:
        HTTPException: If no search criteria are provided or invalid search_type
    """
    if not folder_name and not bookmark_title:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one search parameter (folder_name or bookmark_title) must be provided"
        )
    
    valid_search_types = ["partial", "exact", "case_sensitive", "first_letter"]
    if search_type not in valid_search_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid search_type. Must be one of: {', '.join(valid_search_types)}"
        )
    
    # Start with base query joining bookmarks with folders
    query = db.query(Bookmark).join(Folder)
    
    # Apply filters based on provided parameters and search type
    if folder_name:
        if search_type == "partial":
            query = query.filter(Folder.name.ilike(f"%{folder_name}%"))
        elif search_type == "exact":
            query = query.filter(Folder.name == folder_name)
        elif search_type == "case_sensitive":
            query = query.filter(Folder.name.like(f"%{folder_name}%"))
        elif search_type == "first_letter":
            query = query.filter(Folder.name.startswith(folder_name))
    
    if bookmark_title:
        if search_type == "partial":
            query = query.filter(Bookmark.title.ilike(f"%{bookmark_title}%"))
        elif search_type == "exact":
            query = query.filter(Bookmark.title == bookmark_title)
        elif search_type == "case_sensitive":
            query = query.filter(Bookmark.title.like(f"%{bookmark_title}%"))
        elif search_type == "first_letter":
            query = query.filter(Bookmark.title.startswith(bookmark_title))
    
    # Execute query and return results
    bookmarks = query.all()
    return bookmarks

@router.get("/favorites", response_model=list[BookmarkResponse])
def get_favorite_bookmarks(db: Session = Depends(get_db)):
    """
    Get all bookmarks marked as favorites.
    
    Args:
        db: Database session dependency
        
    Returns:
        List of all favorite bookmarks
    """
    favorite_bookmarks = db.query(Bookmark).filter(Bookmark.favorite == True).all()
    return favorite_bookmarks

