"""add slug and is_active to tenants

Revision ID: fb3f082ab39a
Revises: cb1b38b3701d
Create Date: 2026-07-13 05:35:40.020743

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "fb3f082ab39a"
down_revision: Union[str, Sequence[str], None] = "cb1b38b3701d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Step 1: Add new columns as nullable
    op.add_column(
        "tenants",
        sa.Column("slug", sa.String(), nullable=True)
    )

    op.add_column(
        "tenants",
        sa.Column("is_active", sa.Boolean(), nullable=True)
    )

    # Step 2: Populate existing rows
    op.execute("""
        UPDATE tenants
        SET
            slug = LOWER(REPLACE(company_name, ' ', '_')),
            is_active = TRUE
        WHERE slug IS NULL;
    """)

    # Step 3: Make columns NOT NULL
    op.alter_column(
        "tenants",
        "slug",
        nullable=False
    )

    op.alter_column(
        "tenants",
        "is_active",
        nullable=False
    )

    # Step 4: Add unique constraint
    op.create_unique_constraint(
        "uq_tenants_slug",
        "tenants",
        ["slug"]
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_tenants_slug",
        "tenants",
        type_="unique"
    )

    op.drop_column(
        "tenants",
        "is_active"
    )

    op.drop_column(
        "tenants",
        "slug"
    )