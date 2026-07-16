from sqlalchemy.orm import Session
import requests
from sqlalchemy import text

KEYCLOAK_URL = "http://localhost:8080"
REALM = "LeaveSync"
CLIENT_ID = "leavesync-api"
CLIENT_SECRET = "kXuTdXbAbr5cPsQADL2dJBenNxIS0SmY"


def login_user(db: Session, email: str, password: str):
    response = requests.post(
        f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token",
        data={
            "grant_type": "password",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "username": email,
            "password": password
        }
    )

    print(response.status_code)
    print(response.text)

    if response.status_code != 200:
        return None

    token = response.json()

    return {
        "access_token": token["access_token"],
        "token_type": "bearer"
    }

from sqlalchemy import text
from app.models.tenant import Tenant
from app.models.user import User


def login_tenant_user(
    db: Session,
    company_slug: str,
    email: str,
    password: str
):
    print("=" * 60)
    print("TENANT LOGIN")
    print(company_slug)
    print(email)
    print("=" * 60)
    

    db.execute(text("SET search_path TO public"))
    tenant = (
        db.query(Tenant)
        .filter(
            Tenant.slug == company_slug,
            Tenant.is_active == True
        )
        .first()
    )

    print("Tenant:", tenant)

    if tenant is None:
        print("TENANT NOT FOUND")
        return None

    db.execute(
        text(f'SET search_path TO "{tenant.schema_name}"')
    )

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    print("User:", user)

    db.execute(text("SET search_path TO public"))

    if user is None:
        print("USER NOT FOUND")
        return None

    response = requests.post(
        f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token",
        data={
            "grant_type": "password",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "username": email,
            "password": password,
        },
    )

    print("KEYCLOAK STATUS:", response.status_code)
    print("KEYCLOAK RESPONSE:", response.text)

    if response.status_code != 200:
        return None

    token = response.json()

    return {
    "access_token": token["access_token"],
    "token_type": "bearer",
    "user": {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    },
}