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