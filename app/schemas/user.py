from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    keycloak_id: str
    is_active: bool

    model_config = {
        "from_attributes": True
    }

class AvailableEmployeeResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }    