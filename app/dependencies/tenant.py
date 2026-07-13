from fastapi import Depends, Header, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.tenant import Tenant


def get_tenant_db(
    x_tenant: str = Header(..., alias="X-Tenant"),
    db: Session = Depends(get_db),
):
    # Find tenant in public.tenants
    tenant = (
        db.query(Tenant)
        .filter(
            Tenant.slug == x_tenant,
            Tenant.is_active == True
        )
        .first()
    )

    if tenant is None:
        raise HTTPException(
            status_code=404,
            detail="Tenant not found"
        )

    # Switch to tenant schema
    db.execute(
        text(f'SET search_path TO "{tenant.schema_name}"')
    )

    try:
        yield db
    finally:
        # Always switch back to public
        db.execute(text("SET search_path TO public"))