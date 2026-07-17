from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.db.tenant_base import TenantBase


class LeaveBalance(TenantBase):
    __tablename__ = "leave_balances"

    id = Column(Integer, primary_key=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=False
    )

    leave_type_id = Column(
        Integer,
        ForeignKey("leave_types.id"),
        nullable=False
    )

    total_days = Column(
        Integer,
        nullable=False
    )

    used_days = Column(
        Integer,
        default=0
    )

    remaining_days = Column(
        Integer,
        nullable=False
    )

    employee = relationship("Employee")

    leave_type = relationship("LeaveType")