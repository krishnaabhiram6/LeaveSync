from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.auth.auth_handler import login_user

from app.schemas.token import Token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    token = login_user(
        db,
        form_data.username,
        form_data.password
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return token


