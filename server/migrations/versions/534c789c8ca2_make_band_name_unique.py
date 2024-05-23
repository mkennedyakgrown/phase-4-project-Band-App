"""make Band name unique

Revision ID: 534c789c8ca2
Revises: 6f3dcfb97c58
Create Date: 2024-05-22 20:45:57.657390

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '534c789c8ca2'
down_revision = '6f3dcfb97c58'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bands', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_bands_name'), ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bands', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_bands_name'), type_='unique')

    # ### end Alembic commands ###