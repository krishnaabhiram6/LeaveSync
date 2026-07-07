from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.leave_type import LeaveTypeCreate, LeaveTypeResponse
from app.crud.leave_type import (
    create_leave_type,
    get_all_leave_types,
    get_leave_type_by_id,
    update_leave_type,
    delete_leave_type
)

from app.auth.security import require_admin

router = APIRouter(
    prefix="/leave-types",
    tags=["Leave Types"]
)


@router.post("/", response_model=LeaveTypeResponse)
def create_new_leave_type(
    leave_type: LeaveTypeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_leave_type(db, leave_type)


@router.get("/", response_model=list[LeaveTypeResponse])
def get_leave_types(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_all_leave_types(db)


@router.get("/{leave_type_id}", response_model=LeaveTypeResponse)
def get_leave_type(
    leave_type_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_leave_type_by_id(db, leave_type_id)


@router.put("/{leave_type_id}", response_model=LeaveTypeResponse)
def update_existing_leave_type(
    leave_type_id: int,
    leave_type: LeaveTypeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_leave_type(db, leave_type_id, leave_type)


@router.delete("/{leave_type_id}", response_model=LeaveTypeResponse)
def delete_existing_leave_type(
    leave_type_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_leave_type(db, leave_type_id)