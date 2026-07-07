from pydantic import BaseModel

class EmployeeBase(BaseModel):
    user_id: int
    employee_code: str
    department: str
    designation: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int

    model_config = {
        "from_attributes": True
    }