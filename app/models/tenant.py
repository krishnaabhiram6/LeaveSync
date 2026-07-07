from sqlalchemy import Column, Integer, String

from app.db.base import Base

class Tenant(Base):
    __tablename__="tenants"

    id=Column(Integer,primary_key=True)
    company_name=Column(String, nullable=False)
    schema_name=Column(String,unique=True,nullable=False)
