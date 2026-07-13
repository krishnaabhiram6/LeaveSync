from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    company_slug: str
    email: EmailStr
    password: str