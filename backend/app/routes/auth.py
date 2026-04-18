from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth
from jose import jwt, JWTError
import hashlib
import uuid

from ..database import get_db
from .. import models
from ..config import settings
from ..utils.jwt import create_access_token, create_refresh_token

router = APIRouter(tags=["Auth"])

oauth = OAuth()

google = oauth.register(
    name="google",
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
        "prompt": "consent"
    }
)

@router.get("/login/google")
async def login(request: Request):
    redirect_uri = "http://localhost:8000/auth/callback/google"
    return await google.authorize_redirect(request, redirect_uri)


@router.get("/auth/callback/google")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await google.authorize_access_token(request)

        try:
            user_info = await google.parse_id_token(request, token)
        except Exception:
            resp = await google.get(
                "https://openidconnect.googleapis.com/v1/userinfo",
                token=token
            )
            user_info = resp.json()

        existing_user = db.query(models.User).filter(
            models.User.email == user_info["email"]
        ).first()

        if not existing_user:
            user = models.User(
                email=user_info["email"],
                name=user_info.get("name"),
                profile_picture=user_info.get("picture")
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            existing_user.name = user_info.get("name")
            existing_user.profile_picture = user_info.get("picture")
            db.commit()
            user = existing_user

        access_token = create_access_token({
            "user_id": str(user.id),
            "email": user.email
        })

        refresh_token = create_refresh_token({
            "user_id": str(user.id)
        })

        hashed_token = hashlib.sha256(refresh_token.encode()).hexdigest()

        db.query(models.RefreshToken).filter(
            models.RefreshToken.user_id == user.id,
            models.RefreshToken.is_revoked == False
        ).update({"is_revoked": True})
        db.commit()

        db_token = models.RefreshToken(
            user_id=user.id,
            token=hashed_token
        )
        db.add(db_token)
        db.commit()

        return {
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "email": user.email,
                "name": user.name
            }
        }

    except Exception as e:
        import traceback

        if "mismatching_state" in str(e):
            return {
                "error": "Session expired. Try login again.",
                "fix": "Open /login/google in browser (no refresh)"
            }

        return {
            "error": str(e),
            "trace": traceback.format_exc()
        }


security = HTTPBearer()


@router.post("/refresh")
def refresh_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    hashed = hashlib.sha256(token.encode()).hexdigest()

    db_token = db.query(models.RefreshToken).filter(
        models.RefreshToken.token == hashed,
        models.RefreshToken.is_revoked == False
    ).first()

    if not db_token:
        raise HTTPException(status_code=401, detail="Token revoked or invalid")

    db_token.is_revoked = True
    db.commit()

    new_refresh = create_refresh_token({
        "user_id": payload["user_id"]
    })

    new_hashed = hashlib.sha256(new_refresh.encode()).hexdigest()

    db.add(models.RefreshToken(
        user_id=uuid.UUID(payload["user_id"]),
        token=new_hashed
    ))
    db.commit()

    # 🔐 NEW ACCESS TOKEN
    new_access = create_access_token({
        "user_id": payload["user_id"]
    })

    return {
        "access_token": new_access,
        "refresh_token": new_refresh
    }


@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    hashed = hashlib.sha256(token.encode()).hexdigest()

    db_token = db.query(models.RefreshToken).filter(
        models.RefreshToken.token == hashed
    ).first()

    if db_token:
        db_token.is_revoked = True
        db.commit()

    return {"message": "Logged out successfully"}