"""Add password to users

Revision ID: cb1b38b3701d
Revises: 12d7570faa93
Create Date: 2026-07-04 07:44:12.172246

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "cb1b38b3701d"
down_revision: Union[str, Sequence[str], None] = "12d7570faa93"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "users",
        sa.Column(
            "password",
            sa.String(),
            nullable=False,
            server_default="temp123"
        )
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("users", "password")