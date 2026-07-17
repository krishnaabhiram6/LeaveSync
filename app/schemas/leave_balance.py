from pydantic import BaseModel


class LeaveBalanceBase(BaseModel):
    employee_id: int
    leave_type_id: int
    total_days: int


class LeaveBalanceCreate(LeaveBalanceBase):
    pass


class LeaveBalanceResponse(LeaveBalanceBase):
    id: int
    used_days: int
    remaining_days: int

    model_config = {
        "from_attributes": True
    }


class LeaveBalanceDisplayResponse(BaseModel):
    id: int

    employee_name: str

    leave_type_name: str

    total_days: int

    used_days: int

    remaining_days: int

    model_config = {
        "from_attributes": True
    }