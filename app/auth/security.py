from datetime import datetime, timedelta, timezone
import os

from dotenv import load_dotenv
from jose import jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.auth.keycloak import verify_token

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    try:
        payload = verify_token(token)
        return payload

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid or expired token: {str(e)}"
        )


def require_admin(
    current_user=Depends(get_current_user)
):
    roles = current_user.get("realm_access", {}).get("roles", [])

    if "Admin" not in roles:
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def require_employee(
    current_user=Depends(get_current_user)
):
    roles = current_user.get("realm_access", {}).get("roles", [])

    if "Employee" not in roles:
        raise HTTPException(
            status_code=403,
            detail="Employee access required"
        )

    return current_user


def require_manager(
    current_user=Depends(get_current_user)
):
    roles = current_user.get("realm_access", {}).get("roles", [])

    if "Manager" not in roles and "Admin" not in roles:
        raise HTTPException(
            status_code=403,
            detail="Manager or Admin access required"
        )

    return current_user