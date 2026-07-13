from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.tenant_base import TenantBase
class Employee(TenantBase):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    employee_code = Column(String, unique=True, nullable=False)

    department = Column(String, nullable=False)

    designation = Column(String, nullable=False)

    user = relationship("User")