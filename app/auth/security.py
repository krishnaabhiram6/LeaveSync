from datetime import datetime, timedelta, timezone
import os

from dotenv import load_dotenv
from jose import jwt
from passlib.context import CryptContext

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session
from sqlalchemy import text

from app.auth.keycloak import verify_token
from app.db.session import get_db
from app.models.user import User
from app.models.tenant import Tenant
from app.dependencies.tenant import get_current_tenant

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

bearer_scheme = HTTPBearer()


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
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
    tenant: Tenant | None = Depends(get_current_tenant),
):
    try:
        token = credentials.credentials

        payload = verify_token(token)

        email = payload.get("email")

        print("=" * 60)
        print("EMAIL:", email)
        print("TENANT:", tenant)

        print(
            "CURRENT SCHEMA:",
            db.execute(text("SELECT current_schema()")).scalar()
        )

        users = db.execute(
            text("SELECT id, email FROM users")
        ).fetchall()

        print("USERS:", users)
        print("=" * 60)

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        user.keycloak_roles = (
            payload.get("realm_access", {})
            .get("roles", [])
        )

        print("KEYCLOAK ROLES:", user.keycloak_roles)

        return user

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid or expired token: {str(e)}"
        )


def require_admin(
    current_user: User = Depends(get_current_user)
):
    roles = current_user.keycloak_roles

    if (
        "Admin" not in roles
        and
        "SuperAdmin" not in roles
    ):
        raise HTTPException(
            status_code=403,
            detail="Admin or SuperAdmin access required"
        )

    return current_user


def require_employee(
    current_user: User = Depends(get_current_user)
):
    if (
        "Employee" not in current_user.keycloak_roles
        and
        "Manager" not in current_user.keycloak_roles
    ):
        raise HTTPException(
            status_code=403,
            detail="Employee or Manager access required"
        )

    return current_user


def require_manager(
    current_user: User = Depends(get_current_user)
):
    if (
        "Manager" not in current_user.keycloak_roles
        and
        "Admin" not in current_user.keycloak_roles
    ):
        raise HTTPException(
            status_code=403,
            detail="Manager or Admin access required"
        )

    return current_user