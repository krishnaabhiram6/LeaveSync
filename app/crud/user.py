from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.auth.security import pwd_context

def create_user(db: Session, user: UserCreate):

    hashed_password = pwd_context.hash(user.password)

    db_user = User(
        keycloak_id=user.keycloak_id,
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_all_users(db: Session):
    return db.query(User).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()

    if db_user:
        db_user.name = user.name
        db_user.email = user.email
        db_user.role = user.role
        db_user.keycloak_id = user.keycloak_id

        db.commit()
        db.refresh(db_user)

    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()

    if db_user:
        db.delete(db_user)
        db.commit()

    return db_user