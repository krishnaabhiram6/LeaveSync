import requests
from jose import jwt

KEYCLOAK_URL = "http://localhost:8080"
REALM = "LeaveSync"
CLIENT_ID = "leavesync-api"

JWKS_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"

jwks = requests.get(JWKS_URL).json()


def get_certificate():
    return (
        "-----BEGIN CERTIFICATE-----\n"
        + jwks["keys"][0]["x5c"][0]
        + "\n-----END CERTIFICATE-----"
    )


def verify_token(token: str):
    return jwt.decode(
        token,
        get_certificate(),
        algorithms=["RS256"],
        options={
            "verify_aud": False
        }
    )