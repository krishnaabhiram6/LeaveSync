from sqlalchemy import Column, Integer, String

from app.db.base import Base


class LeaveType(Base):
    __tablename__ = "leave_types"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    max_days_per_year = Column(Integer, nullable=False)