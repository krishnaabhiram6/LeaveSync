from sqlalchemy.orm import Session

from app.models.user import User
from app.auth.security import pwd_context
from app.services.keycloak_admin import create_keycloak_user


def create_default_admin(
    db: Session,
    name: str,
    email: str,
    password: str
):
    # Create user in Keycloak
    keycloak_id = create_keycloak_user(
        name=name,
        email=email,
        password=password,
        role="Admin"
    )

    # Hash password
    hashed_password = pwd_context.hash(password)

    # Save user in tenant schema
    admin = User(
        keycloak_id=keycloak_id,
        name=name,
        email=email,
        password=hashed_password,
        role="Admin",
        is_active=True
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin