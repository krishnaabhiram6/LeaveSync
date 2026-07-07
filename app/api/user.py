from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.crud.user import (
    create_user,
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user
)

from app.auth.security import (
    get_current_user,
    require_admin
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/", response_model=UserResponse)
def create_new_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_user(db, user)


@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_users(db)


@router.get("/me")
def get_my_profile(
    current_user=Depends(get_current_user)
):
    return current_user


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_user_by_id(db, user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update_existing_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return update_user(db, user_id, user)


@router.delete("/{user_id}", response_model=UserResponse)
def delete_existing_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_user(db, user_id)