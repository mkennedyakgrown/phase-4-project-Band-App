"""empty message

Revision ID: 6f3dcfb97c58
Revises: 5cc9f47d7cb9
Create Date: 2024-05-22 15:47:43.963565

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f3dcfb97c58'
down_revision = '5cc9f47d7cb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs_users_instruments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('notes', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs_users_instruments', schema=None) as batch_op:
        batch_op.drop_column('notes')

    # ### end Alembic commands ###