"""initial db

Revision ID: 1a114f895d1b
Revises: 
Create Date: 2024-04-25 21:12:41.234730

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a114f895d1b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bands',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('owner_id', sa.Integer(), nullable=False),
        sa.Column('genre', sa.String(), nullable=False),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('instruments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('genres',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('band_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['band_id'], ['bands.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users_bands',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('band_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['band_id'], ['bands.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('user_id', 'band_id')
    )
    op.create_table('songs_users_instruments',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('song_id', sa.Integer(), nullable=False),
        sa.Column('instrument_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['instrument_id'], ['instruments.id'], ),
        sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('user_id', 'song_id', 'instrument_id')
    )


def downgrade():
    op.drop_table('users')
    op.drop_table('bands')
    op.drop_table('instruments')
    op.drop_table('genres')
    op.drop_table('songs')
    op.drop_table('users_bands')
    op.drop_table('songs_users_instruments')
