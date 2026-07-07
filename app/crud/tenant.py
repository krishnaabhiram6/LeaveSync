from sqlalchemy.orm import Session

from app.models.tenant import Tenant
from app.schemas.tenant import TenantCreate


def create_tenant(db: Session, tenant: TenantCreate):
    db_tenant = Tenant(
        company_name=tenant.company_name,
        schema_name=tenant.schema_name
    )

    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)

    return db_tenant


def get_all_tenants(db: Session):
    return db.query(Tenant).all()

def get_tenant_by_id(db: Session, tenant_id: int):
    return db.query(Tenant).filter(Tenant.id == tenant_id).first()

def update_tenant(db: Session, tenant_id: int, tenant: TenantCreate):
    db_tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()

    if db_tenant:
        db_tenant.company_name = tenant.company_name
        db_tenant.schema_name = tenant.schema_name

        db.commit()
        db.refresh(db_tenant)

    return db_tenant

def delete_tenant(db: Session, tenant_id: int):
    db_tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()

    if db_tenant:
        db.delete(db_tenant)
        db.commit()

    return db_tenant