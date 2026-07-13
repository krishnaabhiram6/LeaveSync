from pydantic import BaseModel, EmailStr


class UserInfo(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }


class EmployeeBase(BaseModel):
    user_id: int
    employee_code: str
    department: str
    designation: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(BaseModel):
    id: int

    employee_code: str
    department: str
    designation: str

    user: UserInfo

    model_config = {
        "from_attributes": True
    }