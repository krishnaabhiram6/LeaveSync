from sqlalchemy.orm import Session
from app.models.user import User
from app.models.employee import Employee
from app.schemas.user import UserCreate, UserResponse
from app.auth.security import pwd_context
from app.services.keycloak_admin import (
    create_keycloak_user,
    update_keycloak_user,
    delete_keycloak_user,
    reset_keycloak_password,
)


def create_user(db: Session, user: UserCreate):
    # Hash password
    hashed_password = pwd_context.hash(user.password)

    # Create user in Keycloak
    keycloak_id = create_keycloak_user(
        name=user.name,
        email=user.email,
        password=user.password,
        role=user.role
    )

    # Save user in PostgreSQL
    db_user = User(
        keycloak_id=keycloak_id,
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Automatically create Employee record
    if user.role == "Employee":
        employee = Employee(
            user_id=db_user.id,
            employee_code=f"EMP{db_user.id:03}",
            department="",
            designation=""
        )

        db.add(employee)
        db.commit()

    return db_user


def get_all_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()

    if db_user is None:
        return None

    db_user.name = user.name
    db_user.email = user.email
    db_user.role = user.role

    if user.password and user.password.strip():
        hashed_password = pwd_context.hash(user.password)

        db_user.password = hashed_password

        reset_keycloak_password(
            db_user.keycloak_id,
            user.password
        )

    db.commit()
    db.refresh(db_user)

    update_keycloak_user(
        user_id=db_user.keycloak_id,
        name=db_user.name,
        email=db_user.email
    )

    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()

    if db_user is None:
        return None

    # Delete Employee record first (if exists)
    employee = db.query(Employee).filter(
        Employee.user_id == db_user.id
    ).first()

    if employee:
        db.delete(employee)
        db.commit()

    # Delete from Keycloak
    delete_keycloak_user(db_user.keycloak_id)

    # Snapshot the response BEFORE delete/commit expires the instance
    response = UserResponse.model_validate(db_user)

    # Delete from PostgreSQL
    db.delete(db_user)
    db.commit()

    return response