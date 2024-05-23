"""empty message

Revision ID: e022907482e1
Revises: aa36bc22fd68
Create Date: 2024-05-22 13:39:19.912136

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e022907482e1'
down_revision = 'aa36bc22fd68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_instruments')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_instruments',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('proficiency', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_users_instruments')
    )
    # ### end Alembic commands ###