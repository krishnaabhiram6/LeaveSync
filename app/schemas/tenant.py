from pydantic import BaseModel, EmailStr


class TenantBase(BaseModel):
    company_name: str
    slug: str
    schema_name: str


class TenantCreate(TenantBase):
    admin_name: str
    admin_email: EmailStr
    admin_password: str

class TenantUpdate(BaseModel):
    company_name: str
    slug: str
    schema_name: str    


class TenantResponse(TenantBase):
    id: int
    is_active: bool

    model_config = {
        "from_attributes": True
    }