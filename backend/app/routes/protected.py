from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from ..utils.jwt import verify_access_token
from ..database import get_db
from .. import models

router = APIRouter(tags=["Protected"])

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload


@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return {
        "message": "You are authenticated",
        "user": user
    }

@router.get("/user/profile")
def get_user_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch user from database using user_id from token
    db_user = db.query(models.User).filter(models.User.id == user["user_id"]).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": str(db_user.id),
        "name": db_user.name,
        "email": db_user.email,
        "profile_picture": db_user.profile_picture
    }
