from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.leave_balance import LeaveBalance
from app.models.employee import Employee
from app.models.leave_type import LeaveType

from app.schemas.leave_balance import (
    LeaveBalanceCreate,
    LeaveBalanceResponse,
    LeaveBalanceDisplayResponse
)


def create_leave_balance(
    db: Session,
    leave_balance: LeaveBalanceCreate
):
    db_leave_balance = LeaveBalance(
        employee_id=leave_balance.employee_id,
        leave_type_id=leave_balance.leave_type_id,
        total_days=leave_balance.total_days,
        used_days=0,
        remaining_days=leave_balance.total_days
    )

    db.add(db_leave_balance)
    db.commit()
    db.refresh(db_leave_balance)

    return db_leave_balance

def get_all_leave_balances(
    db: Session
):
    leave_balances = db.query(LeaveBalance).all()

    result = []

    for balance in leave_balances:
        result.append({
            "id": balance.id,
            "employee_name": balance.employee.user.name,
            "leave_type_name": balance.leave_type.name,
            "total_days": balance.total_days,
            "used_days": balance.used_days,
            "remaining_days": balance.remaining_days,
        })

    return result


def get_leave_balance_by_id(
    db: Session,
    leave_balance_id: int
):
    db_leave_balance = (
        db.query(LeaveBalance)
        .filter(
            LeaveBalance.id == leave_balance_id
        )
        .first()
    )

    if db_leave_balance is None:
        raise HTTPException(
            status_code=404,
            detail="Leave Balance not found"
        )

    return db_leave_balance


def update_leave_balance(
    db: Session,
    leave_balance_id: int,
    leave_balance: LeaveBalanceCreate
):
    db_leave_balance = (
        db.query(LeaveBalance)
        .filter(
            LeaveBalance.id == leave_balance_id
        )
        .first()
    )

    if db_leave_balance is None:
        raise HTTPException(
            status_code=404,
            detail="Leave Balance not found"
        )

    db_leave_balance.employee_id = leave_balance.employee_id
    db_leave_balance.leave_type_id = leave_balance.leave_type_id
    db_leave_balance.total_days = leave_balance.total_days
    db_leave_balance.remaining_days = (
        leave_balance.total_days
        - db_leave_balance.used_days
    )

    db.commit()
    db.refresh(db_leave_balance)

    return db_leave_balance


def delete_leave_balance(
    db: Session,
    leave_balance_id: int
):
    db_leave_balance = (
        db.query(LeaveBalance)
        .filter(
            LeaveBalance.id == leave_balance_id
        )
        .first()
    )

    if db_leave_balance is None:
        raise HTTPException(
            status_code=404,
            detail="Leave Balance not found"
        )

    response = LeaveBalanceResponse.model_validate(
        db_leave_balance
    )

    db.delete(db_leave_balance)
    db.commit()

    return response



def get_my_leave_balances(
    db: Session,
    current_user
):
    employee = (
        db.query(Employee)
        .filter(Employee.user_id == current_user.id)
        .first()
    )

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    leave_balances = (
        db.query(LeaveBalance)
        .filter(
            LeaveBalance.employee_id == employee.id
        )
        .all()
    )

    result = []

    for balance in leave_balances:
        result.append({
            "id": balance.id,
            "leave_type_name": balance.leave_type.name,
            "total_days": balance.total_days,
            "used_days": balance.used_days,
            "remaining_days": balance.remaining_days,
        })

    return result