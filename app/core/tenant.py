from sqlalchemy.orm import Session
from sqlalchemy import text

from app.models.tenant import Tenant


def set_tenant_schema(
    db: Session,
    slug: str
):
    tenant = (
        db.query(Tenant)
        .filter(
            Tenant.slug == slug,
            Tenant.is_active == True
        )
        .first()
    )

    if tenant is None:
        raise Exception("Tenant not found")

    db.execute(
        text(
            f'SET search_path TO "{tenant.schema_name}"'
        )
    )

    return tenant