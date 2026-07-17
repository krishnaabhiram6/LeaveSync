from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import tenant
from app.api import user
from app.api import employee
from app.api import leave_type
from app.api import leave
from app.api import notification
from app.api import auth
from app.api import tenant_auth
from app.api import dashboard
from app.api import leave_balance


app = FastAPI(
    title="LeaveSync API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(tenant.router)
app.include_router(user.router)
app.include_router(employee.router)
app.include_router(leave_type.router)
app.include_router(leave.router)
app.include_router(notification.router)
app.include_router(auth.router)
app.include_router(tenant_auth.router)
app.include_router(dashboard.router)
app.include_router(leave_balance.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to LeaveSync API"
    }