from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import ForeignKey

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    owned_bands = db.relationship('Band', back_populates='owner', cascade='all, delete-orphan')
    member_bands = db.relationship('Band', secondary='users_bands', back_populates='members')
    instruments = db.relationship('Instrument', secondary='songs_users_instruments', back_populates='members')
    songs = db.relationship('Song', secondary='songs_users_instruments', back_populates='members')
    genres = association_proxy('member_bands', 'genre')

    @validates('username')
    def validate_username(self, key, name):
        if name == '':
            raise ValueError('Username cannot be an empty string')
        elif self.query.filter_by(username=name).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'
    
class Band(db.Model, SerializerMixin):
    __tablename__ = 'bands'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    genre_id = db.Column(db.Integer, ForeignKey('genres.id'))
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='owned_bands')
    members = db.relationship('User', secondary='users_bands', back_populates='member_bands')
    songs = db.relationship('Song', back_populates='band', cascade='all, delete-orphan')
    genre = db.relationship('Genre', back_populates='bands', uselist=False)
    instruments = association_proxy('songs', 'instruments')

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        elif self.query.filter_by(name=name).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name
        
class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    band_id = db.Column(db.Integer, ForeignKey('bands.id'))


    band = db.relationship('Band', back_populates='songs', uselist=False)
    instruments = db.relationship('Instrument', secondary='songs_users_instruments', back_populates='songs')
    members = db.relationship('User', secondary='songs_users_instruments', back_populates='member_bands')

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        else:
            return name
        
class Instrument(db.Model, SerializerMixin):
    __tablename__ = 'instruments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    members = db.relationship('User', secondary='songs_users_instruments', back_populates='instruments')
    songs = db.relationship('Song', secondary='songs_users_instruments', back_populates='instruments')
    bands = association_proxy('songs', 'band')

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        elif self.query.filter_by(name=name).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name
        
class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    bands = db.relationship('Band', back_populates='genre', cascade='all')

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        elif self.query.filter_by(name=name).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name
        
users_bands = db.Table('users_bands',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('band_id', db.Integer, db.ForeignKey('bands.id'), primary_key=True),
    db.PrimaryKeyConstraint('user_id', 'band_id')
)

songs_users_instruments = db.Table('songs_users_instruments',
    
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('instrument_id', db.Integer, db.ForeignKey('instruments.id')),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id')),
    db.PrimaryKeyConstraint('user_id', 'instrument_id', 'song_id')
)