from datetime import datetime, timedelta, timezone

from jose import jwt

from passlib.context import CryptContext

from jose import JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose.exceptions import ExpiredSignatureError

from dotenv import load_dotenv

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.user import User

import os

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

from app.auth.keycloak import verify_token
from jose import JWTError
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        payload = verify_token(token)
        print("PAYLOAD:", payload)
        email = payload.get("email")
        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Email not found in token"
            )
        user = db.query(User).filter(
            User.email == email
        ).first()
        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )
        return user
    except Exception as e:
        print("VERIFY ERROR:", repr(e))
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )
    
    
def require_admin(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )
    return current_user    

def require_employee(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "Employee":
        raise HTTPException(
            status_code=403,
            detail="Employee access required"
        )
    return current_user

def require_manager(
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["Manager", "Admin"]:
        raise HTTPException(
            status_code=403,
            detail="Manager or Admin access required"
        )

    return current_user