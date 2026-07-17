from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.tenant import get_tenant_db
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse
)
from app.crud.notification import (
    create_notification,
    get_all_notifications,
    get_notification_by_id,
    update_notification,
    delete_notification,
    get_my_notifications,
)

from app.auth.security import (
    require_admin,
    get_current_user,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.post("/", response_model=NotificationResponse)
def create_new_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin)
):
    return create_notification(db, notification)


@router.get("/", response_model=list[NotificationResponse])
def get_notifications(
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin)
):
    return get_all_notifications(db)


@router.get("/my", response_model=list[NotificationResponse])
def get_my_notification_list(
    db: Session = Depends(get_tenant_db),
    current_user=Depends(get_current_user),
):
    return get_my_notifications(
        db,
        current_user,
    )


@router.get("/{notification_id}", response_model=NotificationResponse)
def get_notification(
    notification_id: int,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin)
):
    return get_notification_by_id(db, notification_id)


@router.put("/{notification_id}", response_model=NotificationResponse)
def update_existing_notification(
    notification_id: int,
    notification: NotificationCreate,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin)
):
    return update_notification(
        db,
        notification_id,
        notification
    )


@router.delete("/{notification_id}", response_model=NotificationResponse)
def delete_existing_notification(
    notification_id: int,
    db: Session = Depends(get_tenant_db),
    current_user=Depends(require_admin)
):
    deleted = delete_notification(db, notification_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Notification not found")

    return deleted