from pydantic import BaseModel


class LoggedInUser(BaseModel):
    id: int
    name: str
    email: str
    role: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: LoggedInUser