from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.db.tenant_base import TenantBase

class Leave(TenantBase):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    leave_type_id = Column(Integer, ForeignKey("leave_types.id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String, default="Pending")
    reason = Column(String)
    employee = relationship("Employee")
    leave_type = relationship("LeaveType")
    