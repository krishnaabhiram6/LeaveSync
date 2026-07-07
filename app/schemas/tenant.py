from pydantic import BaseModel

class TenantBase(BaseModel):
    company_name: str
    schema_name: str

class TenantCreate(TenantBase):
    pass

class TenantResponse(TenantBase):
    id: int

    model_config = {
        "from_attributes": True
    }

    