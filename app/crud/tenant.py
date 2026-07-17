from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db.database import engine
from app.db.tenant_base import TenantBase

from app.models.tenant import Tenant
from app.schemas.tenant import TenantCreate,TenantUpdate
from app.db.session import SessionLocal
from app.services.tenant_admin import create_default_admin
# Import tenant models so TenantBase.metadata knows about them
import app.models.user
import app.models.employee
import app.models.leave_type
import app.models.leave
import app.models.notification
import app.models.leave_balance


def create_tenant(db: Session, tenant: TenantCreate):
    existing = (
        db.query(Tenant)
        .filter(Tenant.schema_name == tenant.schema_name)
        .first()
    )

    if existing:
        raise Exception("Schema already exists")

    db_tenant = Tenant(
        company_name=tenant.company_name,
        slug=tenant.slug,
        schema_name=tenant.schema_name,
        is_active=True
    )

    db.add(db_tenant)
    db.commit()

    # Create PostgreSQL schema
    db.execute(
        text(f'CREATE SCHEMA IF NOT EXISTS "{tenant.schema_name}"')
    )
    db.commit()

    # Create all tenant tables
    with engine.begin() as connection:

        connection.execute(
            text(f'SET search_path TO "{tenant.schema_name}"')
        )
        print("=" * 50)
        print(TenantBase.metadata.tables.keys())
        print("=" * 50)
        TenantBase.metadata.create_all(bind=connection)

    # --------------------------------------------------
    # Switch this session to the tenant schema
    # --------------------------------------------------
    db.execute(
        text(f'SET search_path TO "{tenant.schema_name}"')
    )

    # --------------------------------------------------
    # Create default admin
    # --------------------------------------------------
    create_default_admin(
    db=db,
    name=tenant.admin_name,
    email=tenant.admin_email,
    password=tenant.admin_password,
)

    # --------------------------------------------------
    # Switch back to public
    # --------------------------------------------------
    db.execute(text("SET search_path TO public"))
    db.commit()

    return db_tenant


def get_all_tenants(db: Session):
    return db.query(Tenant).all()


def get_tenant_by_id(db: Session, tenant_id: int):
    return (
        db.query(Tenant)
        .filter(Tenant.id == tenant_id)
        .first()
    )


def update_tenant(
    db: Session,
    tenant_id: int,
    tenant: TenantUpdate,
):
    db_tenant = (
        db.query(Tenant)
        .filter(Tenant.id == tenant_id)
        .first()
    )

    if db_tenant:
        db_tenant.company_name = tenant.company_name
        db_tenant.slug = tenant.slug
        db_tenant.schema_name = tenant.schema_name

        db.commit()
        db.refresh(db_tenant)

    return db_tenant


def delete_tenant(db: Session, tenant_id: int):
    db_tenant = (
        db.query(Tenant)
        .filter(Tenant.id == tenant_id)
        .first()
    )

    if db_tenant:
        db.execute(
            text(
                f'DROP SCHEMA IF EXISTS "{db_tenant.schema_name}" CASCADE'
            )
        )

        db.delete(db_tenant)
        db.commit()

    return db_tenant