from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.leave import Leave
from app.models.leave_type import LeaveType


def get_dashboard_summary(db: Session):
    total_employees = db.query(Employee).count()

    total_leave_types = db.query(LeaveType).count()

    total_leaves = db.query(Leave).count()

    pending_leaves = (
        db.query(Leave)
        .filter(Leave.status == "Pending")
        .count()
    )

    approved_leaves = (
        db.query(Leave)
        .filter(Leave.status == "Approved")
        .count()
    )

    rejected_leaves = (
        db.query(Leave)
        .filter(Leave.status == "Rejected")
        .count()
    )

    return {
        "total_employees": total_employees,
        "total_leave_types": total_leave_types,
        "total_leaves": total_leaves,
        "pending_leaves": pending_leaves,
        "approved_leaves": approved_leaves,
        "rejected_leaves": rejected_leaves,
    }