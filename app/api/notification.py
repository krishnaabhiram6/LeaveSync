from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.notification import NotificationCreate,NotificationResponse
from app.crud.notification import create_notification,get_all_notifications,get_notification_by_id,update_notification,delete_notification
from app.auth.security import get_current_user,require_admin
from app.models.user import User

router=APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@router.post("/",response_model=NotificationResponse)
def create_new_notification(
    notification:NotificationCreate,
    db:Session=Depends(get_db),
    current_user:User=Depends(require_admin)
):
    return create_notification(db,notification)

@router.get("/",response_model=list[NotificationResponse])
def get_notifications(
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    return get_all_notifications(db)

@router.get("/{notification_id}",response_model=NotificationResponse)
def get_notification(
    notification_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):
    return get_notification_by_id(db,notification_id)

@router.put("/{notification_id}",response_model=NotificationResponse)
def update_existing_notification(
    notification_id:int,
    notification:NotificationCreate,
    db:Session=Depends(get_db),
    current_user:User=Depends(require_admin)
):
    return update_notification(db,notification_id,notification)

@router.delete("/{notification_id}",response_model=NotificationResponse)
def delete_existing_notification(
    notification_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(require_admin)
):
    return delete_notification(db,notification_id)