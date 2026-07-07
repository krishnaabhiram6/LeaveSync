from datetime import datetime
from pydantic import BaseModel

class NotificationBase(BaseModel):
    user_id: int
    message: str

class NotificationCreate(NotificationBase):
    pass

class NotificationResponse(NotificationBase):
    id: int
    sent_at: datetime | None
    is_read: bool

    model_config = {
        "from_attributes": True
    }