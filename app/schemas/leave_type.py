from pydantic import BaseModel

class LeaveTypeBase(BaseModel):
    name: str
    max_days_per_year: int

class LeaveTypeCreate(LeaveTypeBase):
    pass

class LeaveTypeResponse(LeaveTypeBase):
    id: int

    model_config = {
        "from_attributes": True
    }

