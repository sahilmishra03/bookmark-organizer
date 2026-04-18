from jose import jwt, JWTError
from datetime import datetime, timedelta
from ..config import settings

SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"

ACCESS_EXPIRE_MIN = 15
REFRESH_EXPIRE_DAYS = 7


def create_access_token(data: dict):
    to_encode = data.copy()

    to_encode.update({
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRE_MIN),
        "iat": datetime.utcnow(),
        "type": "access",
        "iss": "bookmark-organizer",
        "sub": str(data.get("user_id", ""))
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()

    to_encode.update({
        "exp": datetime.utcnow() + timedelta(days=REFRESH_EXPIRE_DAYS),
        "iat": datetime.utcnow(),
        "type": "refresh",
        "iss": "bookmark-organizer",
        "sub": str(data.get("user_id", ""))
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def verify_access_token(token: str):
    payload = verify_token(token)

    if payload is None or payload.get("type") != "access":
        return None

    return payload


def verify_refresh_token(token: str):
    payload = verify_token(token)

    if payload is None or payload.get("type") != "refresh":
        return None

    return payload