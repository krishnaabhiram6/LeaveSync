from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.tenant import get_tenant_db
from app.auth.security import require_admin

from app.crud.dashboard import get_dashboard_summary

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin),
):
    return get_dashboard_summary(db)