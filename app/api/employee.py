from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.crud.employee import (
    create_employee,
    get_all_employees,
    get_employee_by_id,
    update_employee,
    delete_employee
)

from app.auth.security import require_admin

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post("/", response_model=EmployeeResponse)
def create_new_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_employee(db, employee)


@router.get("/", response_model=list[EmployeeResponse])
def get_employees(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_all_employees(db)


@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_employee_by_id(db, employee_id)


@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_existing_employee(
    employee_id: int,
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_employee(db, employee_id, employee)


@router.delete("/{employee_id}", response_model=EmployeeResponse)
def delete_existing_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_employee(db, employee_id)