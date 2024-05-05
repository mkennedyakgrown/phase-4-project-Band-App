"""Add song_id column to songs_users_instruments table, assign PrimaryKeyConstraint to both join tables

Revision ID: 6059370eeb5e
Revises: aafa73bb6130
Create Date: 2024-05-05 11:59:39.971901

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6059370eeb5e'
down_revision = 'aafa73bb6130'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs_users_instruments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('song_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_songs_users_instruments_song_id_songs'), 'songs', ['song_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('songs_users_instruments', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_songs_users_instruments_song_id_songs'), type_='foreignkey')
        batch_op.drop_column('song_id')

    # ### end Alembic commands ###