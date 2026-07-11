import requests
from jose import jwt

KEYCLOAK_URL = "http://localhost:8080"
REALM = "LeaveSync"

JWKS_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"


def verify_token(token: str):
    jwks = requests.get(JWKS_URL).json()

    headers = jwt.get_unverified_header(token)
    kid = headers["kid"]

    key = None

    for jwk in jwks["keys"]:
        if jwk["kid"] == kid:
            key = jwk
            break

    if key is None:
        raise Exception("Public key not found")

    return jwt.decode(
        token,
        key,
        algorithms=["RS256"],
        options={"verify_aud": False},
    )