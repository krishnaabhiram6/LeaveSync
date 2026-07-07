from sqlalchemy.orm import Session
import requests

KEYCLOAK_URL="http://localhost:8080"
REALM="LeaveSync"
CLIENT_ID="leavesync-api"
CLIENT_SECRET="8wqcWbviUVKkT8Wg7hfD93QD5IHw2fCR"

def login_user(db: Session,email: str,password: str):
    response=requests.post(
    f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token",
    data={
        "grant_type":"password",
        "client_id":CLIENT_ID,
        "client_secret":CLIENT_SECRET,
        "username":email,
        "password":password
    }
)

    print(response.status_code)
    print(response.text)

    if response.status_code!=200:
        return None

    token=response.json()

    return{
        "access_token":token["access_token"],
        "token_type":"bearer"
    }