from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..utils.jwt import verify_access_token

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
