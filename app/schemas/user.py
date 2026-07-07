from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    keycloak_id: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    model_config = {
        "from_attributes": True
    }