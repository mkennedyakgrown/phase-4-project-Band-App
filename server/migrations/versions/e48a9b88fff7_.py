"""empty message

Revision ID: e48a9b88fff7
Revises: 1a114f895d1b
Create Date: 2024-05-02 17:12:45.132337

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e48a9b88fff7'
down_revision = '1a114f895d1b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_genres'))
    )
    op.create_table('instruments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_instruments'))
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_songs'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('bands',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], name=op.f('fk_bands_genre_id_genres')),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name=op.f('fk_bands_owner_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_bands'))
    )
    op.create_table('songs_users_instruments',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('instrument_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['instrument_id'], ['instruments.id'], name=op.f('fk_songs_users_instruments_instrument_id_instruments')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_songs_users_instruments_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'instrument_id', name=op.f('pk_songs_users_instruments'))
    )
    op.create_table('users_bands',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('band_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['band_id'], ['bands.id'], name=op.f('fk_users_bands_band_id_bands')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_users_bands_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'band_id', name=op.f('pk_users_bands'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_bands')
    op.drop_table('songs_users_instruments')
    op.drop_table('bands')
    op.drop_table('users')
    op.drop_table('songs')
    op.drop_table('instruments')
    op.drop_table('genres')
    # ### end Alembic commands ###
