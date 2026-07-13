from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.tenant import TenantCreate, TenantResponse
from app.crud.tenant import (
    create_tenant,
    get_all_tenants,
    get_tenant_by_id,
    update_tenant,
    delete_tenant
)

from app.auth.security import require_admin

router = APIRouter(
    prefix="/tenants",
    tags=["Tenants"]
)


@router.post("/")
def create_new_tenant(
    tenant: TenantCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    create_tenant(db, tenant)

    return {
        "message": "Tenant created successfully"
    }


@router.get("/", response_model=list[TenantResponse])
def get_tenants(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_all_tenants(db)


@router.get("/{tenant_id}", response_model=TenantResponse)
def get_tenant(
    tenant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_tenant_by_id(db, tenant_id)


@router.put("/{tenant_id}", response_model=TenantResponse)
def update_existing_tenant(
    tenant_id: int,
    tenant: TenantCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_tenant(db, tenant_id, tenant)


@router.delete("/{tenant_id}", response_model=TenantResponse)
def delete_existing_tenant(
    tenant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_tenant(db, tenant_id)