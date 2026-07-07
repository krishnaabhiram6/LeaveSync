from sqlalchemy.orm import Session

from app.models.leave_type import LeaveType
from app.schemas.leave_type import LeaveTypeCreate

def create_leave_type(db: Session, leave_type: LeaveTypeCreate):
    db_leave_type = LeaveType(
        name=leave_type.name,
        max_days_per_year=leave_type.max_days_per_year
    )

    db.add(db_leave_type)
    db.commit()
    db.refresh(db_leave_type)

    return db_leave_type



def get_all_leave_types(db: Session):
    return db.query(LeaveType).all()

def get_leave_type_by_id(db: Session, leave_type_id: int):
    return db.query(LeaveType).filter(LeaveType.id == leave_type_id).first()

def update_leave_type(db: Session, leave_type_id: int, leave_type: LeaveTypeCreate):
    db_leave_type = db.query(LeaveType).filter(
        LeaveType.id == leave_type_id
    ).first()

    if db_leave_type:
        db_leave_type.name = leave_type.name
        db_leave_type.max_days_per_year = leave_type.max_days_per_year

        db.commit()
        db.refresh(db_leave_type)

    return db_leave_type

def delete_leave_type(db: Session, leave_type_id: int):
    db_leave_type = db.query(LeaveType).filter(
        LeaveType.id == leave_type_id
    ).first()

    if db_leave_type:
        db.delete(db_leave_type)
        db.commit()

    return db_leave_type