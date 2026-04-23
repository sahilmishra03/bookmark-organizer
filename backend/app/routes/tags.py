from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Tag
from app.utils.jwt import verify_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter(prefix="/v1/tags", tags=["tags"])
security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload


@router.get("/")
def get_tag_suggestions(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, le=20),

    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    q = q.lower().strip().replace("#", "")

    tags = db.query(Tag).filter(
        Tag.name.ilike(f"{q}%")
    ).limit(limit).all()

    return [tag.name for tag in tags]