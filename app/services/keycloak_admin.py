import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

KEYCLOAK_URL = os.getenv("KEYCLOAK_URL")
REALM = os.getenv("KEYCLOAK_REALM")
CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID")
CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET")


def get_admin_token():

    response = requests.post(
        f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token",
        data={
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
    )

    if response.status_code != 200:
        raise Exception(response.text)

    return response.json()["access_token"]


def assign_realm_role(user_id: str, role_name: str):

    token = get_admin_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    role = requests.get(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/roles/{role_name}",
        headers=headers
    )

    if role.status_code != 200:
        raise Exception(role.text)

    role_json = role.json()

    response = requests.post(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/users/{user_id}/role-mappings/realm",
        headers=headers,
        json=[
            {
                "id": role_json["id"],
                "name": role_json["name"]
            }
        ]
    )

    if response.status_code != 204:
        raise Exception(response.text)


def create_keycloak_user(
    name: str,
    email: str,
    password: str,
    role: str
):

    token = get_admin_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "username": email,
        "email": email,
        "emailVerified": True,
        "enabled": True,
        "firstName": name,
        "lastName": "",
        "requiredActions": [],
        "credentials": [
            {
                "type": "password",
                "value": password,
                "temporary": False
            }
        ]
    }

    print("=" * 60)
    print(payload)
    print("=" * 60)

    response = requests.post(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/users",
        headers=headers,
        json=payload
    )

    print("=" * 60)
    print("CREATE USER STATUS :", response.status_code)
    print("CREATE USER RESPONSE :", response.text)
    print("=" * 60)

    if response.status_code != 201:

        if "same email" in response.text.lower():
            raise HTTPException(
                status_code=409,
                detail="User already exists in Keycloak"
            )

        raise HTTPException(
            status_code=500,
            detail=response.text
        )

    location = response.headers["Location"]

    user_id = location.split("/")[-1]

    assign_realm_role(
        user_id,
        role
    )

    return user_id


def update_keycloak_user(
    user_id: str,
    name: str,
    email: str
):

    token = get_admin_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "firstName": name,
        "email": email
    }

    print("=" * 60)
    print("Updating Keycloak User")
    print("User ID:", user_id)
    print("Payload:", payload)

    response = requests.put(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/users/{user_id}",
        headers=headers,
        json=payload
    )

    print("Status Code:", response.status_code)
    print("Response:", response.text)
    print("=" * 60)

    if response.status_code != 204:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text
        )


def delete_keycloak_user(user_id: str):

    token = get_admin_token()

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.delete(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/users/{user_id}",
        headers=headers
    )

    if response.status_code != 204:
        raise Exception(response.text)


def reset_keycloak_password(
    user_id: str,
    new_password: str
):

    token = get_admin_token()

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "type": "password",
        "temporary": False,
        "value": new_password
    }

    response = requests.put(
        f"{KEYCLOAK_URL}/admin/realms/{REALM}/users/{user_id}/reset-password",
        headers=headers,
        json=payload
    )

    if response.status_code != 204:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text
        )