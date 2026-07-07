from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.leave import LeaveCreate, LeaveResponse
from app.crud.leave import (
    create_leave,
    get_all_leaves,
    get_leave_by_id,
    update_leave,
    delete_leave,
    approve_leave,
    reject_leave
)

from app.auth.security import (
    get_current_user,
    require_employee,
    require_manager
)

router = APIRouter(
    prefix="/leaves",
    tags=["Leaves"]
)


@router.post("/", response_model=LeaveResponse)
def create_new_leave(
    leave: LeaveCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_employee)
):
    return create_leave(
        db,
        leave,
        current_user
    )


@router.get("/", response_model=list[LeaveResponse])
def get_leaves(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_leaves(
        db,
        current_user
    )


@router.get("/{leave_id}", response_model=LeaveResponse)
def get_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_leave_by_id(
        db,
        leave_id,
        current_user
    )


@router.put("/{leave_id}", response_model=LeaveResponse)
def update_existing_leave(
    leave_id: int,
    leave: LeaveCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_employee)
):
    return update_leave(
        db,
        leave_id,
        leave,
        current_user
    )


@router.delete("/{leave_id}", response_model=LeaveResponse)
def delete_existing_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_employee)
):
    return delete_leave(
        db,
        leave_id,
        current_user
    )


@router.put("/{leave_id}/approve", response_model=LeaveResponse)
def approve_leave_route(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_manager)
):
    return approve_leave(
        db,
        leave_id
    )


@router.put("/{leave_id}/reject", response_model=LeaveResponse)
def reject_leave_route(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_manager)
):
    return reject_leave(
        db,
        leave_id
    )