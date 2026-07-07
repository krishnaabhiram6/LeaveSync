from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.schemas.notification import NotificationCreate

def create_notification(db: Session, notification: NotificationCreate):
    db_notification = Notification(
        user_id=notification.user_id,
        message=notification.message
    )

    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)

    return db_notification


def get_all_notifications(db: Session):
    return db.query(Notification).all()

def get_notification_by_id(db: Session, notification_id: int):
    return db.query(Notification).filter(Notification.id == notification_id).first()

def update_notification(
    db: Session,
    notification_id: int,
    notification: NotificationCreate
):
    db_notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if db_notification:
        db_notification.user_id = notification.user_id
        db_notification.message = notification.message

        db.commit()
        db.refresh(db_notification)

    return db_notification

def delete_notification(db: Session, notification_id: int):
    db_notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if db_notification:
        db.delete(db_notification)
        db.commit()

    return db_notification