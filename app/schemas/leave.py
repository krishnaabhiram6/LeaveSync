from datetime import date
from pydantic import BaseModel


class LeaveBase(BaseModel):
    leave_type_id: int
    start_date: date
    end_date: date
    reason: str


class LeaveCreate(LeaveBase):
    pass


class LeaveResponse(LeaveBase):
    id: int
    employee_id: int
    status: str

    model_config = {
        "from_attributes": True
    }

class LeaveDisplayResponse(BaseModel):
    id: int

    employee_id: int
    employee_name: str

    leave_type_id: int
    leave_type_name: str

    start_date: date
    end_date: date

    reason: str
    status: str

    model_config = {
        "from_attributes": True
    }    