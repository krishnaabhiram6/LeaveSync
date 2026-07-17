from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.tenant import get_tenant_db

from app.schemas.leave_balance import (
    LeaveBalanceCreate,
    LeaveBalanceResponse,
    LeaveBalanceDisplayResponse,
)

from app.crud.leave_balance import (
    create_leave_balance,
    get_all_leave_balances,
    get_leave_balance_by_id,
    update_leave_balance,
    delete_leave_balance,
    get_my_leave_balances,
)

from app.auth.security import (
    require_admin,
    get_current_user,
)

router = APIRouter(
    prefix="/leave-balances",
    tags=["Leave Balances"],
)


@router.post("/", response_model=LeaveBalanceResponse)
def create_new_leave_balance(
    leave_balance: LeaveBalanceCreate,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return create_leave_balance(db, leave_balance)


@router.get("/", response_model=list[LeaveBalanceDisplayResponse])
def get_leave_balances(
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return get_all_leave_balances(db)


# ===========================
# Employee - My Leave Balance
# ===========================

@router.get("/my")
def get_my_leave_balance(
    db: Session = Depends(get_tenant_db),
    current_user=Depends(get_current_user),
):
    return get_my_leave_balances(
        db,
        current_user,
    )


# ===========================
# Admin - Get Leave Balance By ID
# ===========================

@router.get("/{leave_balance_id}", response_model=LeaveBalanceResponse)
def get_leave_balance(
    leave_balance_id: int,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return get_leave_balance_by_id(
        db,
        leave_balance_id,
    )


@router.put("/{leave_balance_id}", response_model=LeaveBalanceResponse)
def update_existing_leave_balance(
    leave_balance_id: int,
    leave_balance: LeaveBalanceCreate,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return update_leave_balance(
        db,
        leave_balance_id,
        leave_balance,
    )


@router.delete("/{leave_balance_id}", response_model=LeaveBalanceResponse)
def delete_existing_leave_balance(
    leave_balance_id: int,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return delete_leave_balance(
        db,
        leave_balance_id,
    )