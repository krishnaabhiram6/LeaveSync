from sqlalchemy import Column, Integer, String, Boolean
from app.db.base import Base


class SuperUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    keycloak_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)