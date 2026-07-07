from sqlalchemy.orm import Session

from app.models.leave import Leave
from app.schemas.leave import LeaveCreate

from fastapi import HTTPException
from app.utils.email import send_email

from app.models.user import User
from app.models.employee import Employee

def create_leave(
    db: Session,
    leave: LeaveCreate,
    current_user: User
):
    employee = (
        db.query(Employee)
        .filter(Employee.user_id == current_user.id)
        .first()
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee record not found"
        )

    db_leave = Leave(
        employee_id=employee.id,
        leave_type_id=leave.leave_type_id,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason
    )

    db.add(db_leave)
    db.commit()
    db.refresh(db_leave)

    return db_leave


def get_all_leaves(
    db: Session,
    current_user: User
):
    if current_user.role in ["Admin", "Manager"]:
        return db.query(Leave).all()

    employee = (
        db.query(Employee)
        .filter(Employee.user_id == current_user.id)
        .first()
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee record not found"
        )

    return (
        db.query(Leave)
        .filter(Leave.employee_id == employee.id)
        .all()
    )

def get_leave_by_id(
    db: Session,
    leave_id: int,
    current_user: User
):
    db_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if db_leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    if current_user.role not in ["Admin", "Manager"]:

        employee = (
            db.query(Employee)
            .filter(Employee.user_id == current_user.id)
            .first()
        )

        if employee is None:
            raise HTTPException(
                status_code=404,
                detail="Employee record not found"
            )

        if db_leave.employee_id != employee.id:
            raise HTTPException(
                status_code=403,
                detail="You can view only your own leave"
            )

    return db_leave

def update_leave(
    db: Session,
    leave_id: int,
    leave: LeaveCreate,
    current_user: User
):
    db_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if db_leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    # Admin and Manager can update any leave
    if current_user.role not in ["Admin", "Manager"]:

        employee = (
            db.query(Employee)
            .filter(Employee.user_id == current_user.id)
            .first()
        )

        if employee is None:
            raise HTTPException(
                status_code=404,
                detail="Employee record not found"
            )

        if db_leave.employee_id != employee.id:
            raise HTTPException(
                status_code=403,
                detail="You can update only your own leave"
            )

    db_leave.leave_type_id = leave.leave_type_id
    db_leave.start_date = leave.start_date
    db_leave.end_date = leave.end_date
    db_leave.reason = leave.reason

    db.commit()
    db.refresh(db_leave)

    return db_leave

def delete_leave(
    db: Session,
    leave_id: int,
    current_user: User
):
    db_leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if db_leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave not found"
        )

    if current_user.role not in ["Admin", "Manager"]:

        employee = (
            db.query(Employee)
            .filter(Employee.user_id == current_user.id)
            .first()
        )

        if employee is None:
            raise HTTPException(
                status_code=404,
                detail="Employee record not found"
            )

        if db_leave.employee_id != employee.id:
            raise HTTPException(
                status_code=403,
                detail="You can delete only your own leave"
            )

    db.delete(db_leave)
    db.commit()

    return db_leave




def approve_leave(db: Session, leave_id: int):
    db_leave = db.query(Leave).filter(Leave.id == leave_id).first()

    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave not found")

    db_leave.status = "Approved"

    db.commit()
    db.refresh(db_leave)

    send_email(
        to_email="krishnaabhiramsayala66@gmail.com",
        subject="Leave Approved",
        body="Your leave request has been approved."
    )

    return db_leave


def reject_leave(db: Session, leave_id: int):
    db_leave = db.query(Leave).filter(Leave.id == leave_id).first()

    if db_leave is None:
        raise HTTPException(status_code=404, detail="Leave not found")

    db_leave.status = "Rejected"

    db.commit()
    db.refresh(db_leave)

    send_email(
        to_email="krishnaabhiramsayala66@gmail.com",
        subject="Leave Rejected",
        body="Your leave request has been rejected."
    )

    return db_leave