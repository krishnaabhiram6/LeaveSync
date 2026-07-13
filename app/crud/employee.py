from sqlalchemy.orm import Session, joinedload
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate


def create_employee(db: Session, employee: EmployeeCreate):
    db_employee = Employee(
        user_id=employee.user_id,
        employee_code=employee.employee_code,
        department=employee.department,
        designation=employee.designation
    )

    db.add(db_employee)
    db.commit()

    return (
        db.query(Employee)
        .options(joinedload(Employee.user))
        .filter(Employee.id == db_employee.id)
        .first()
    )


def get_all_employees(db: Session):
    return (
        db.query(Employee)
        .options(joinedload(Employee.user))
        .all()
    )


def get_employee_by_id(db: Session, employee_id: int):
    return (
        db.query(Employee)
        .options(joinedload(Employee.user))
        .filter(Employee.id == employee_id)
        .first()
    )


def update_employee(db: Session, employee_id: int, employee: EmployeeCreate):
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if db_employee is None:
        return None

    db_employee.user_id = employee.user_id
    db_employee.employee_code = employee.employee_code
    db_employee.department = employee.department
    db_employee.designation = employee.designation

    db.commit()

    return (
        db.query(Employee)
        .options(joinedload(Employee.user))
        .filter(Employee.id == employee_id)
        .first()
    )


def delete_employee(db: Session, employee_id: int):
    db_employee = (
        db.query(Employee)
        .options(joinedload(Employee.user))
        .filter(Employee.id == employee_id)
        .first()
    )

    if db_employee is None:
        return None

    response = db_employee

    db.delete(db_employee)
    db.commit()

    return response