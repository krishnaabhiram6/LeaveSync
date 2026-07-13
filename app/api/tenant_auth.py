from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.auth.auth_handler import login_tenant_user

from app.schemas.login import LoginRequest
from app.schemas.token import Token

router = APIRouter(
    prefix="/tenant-auth",
    tags=["Tenant Authentication"]
)


@router.post("/login", response_model=Token)
def tenant_login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    token = login_tenant_user(
        db=db,
        company_slug=login_data.company_slug,
        email=login_data.email,
        password=login_data.password
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return token