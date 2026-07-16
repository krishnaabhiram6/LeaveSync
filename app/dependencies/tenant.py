from fastapi import Depends, Header, HTTPException, Request
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.tenant import Tenant


def get_current_tenant(
    request: Request,
    x_tenant: str | None = Header(default=None, alias="X-Tenant"),
    db: Session = Depends(get_db),
) -> Tenant | None:

    print("=" * 80)
    print("REQUEST HEADERS")
    print(request.headers)
    print("X-Tenant:", x_tenant)
    print("=" * 80)

    if not x_tenant:
        return None

    # Always query tenant from PUBLIC schema
    db.execute(text("SET search_path TO public"))

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

    return tenant


def get_tenant_db(
    tenant: Tenant | None = Depends(get_current_tenant),
    db: Session = Depends(get_db),
):

    if tenant is None:
        raise HTTPException(
            status_code=400,
            detail="X-Tenant header is required"
        )

    db.execute(
        text(f'SET search_path TO "{tenant.schema_name}"')
    )

    try:
        yield db
    finally:
        db.execute(text("SET search_path TO public"))