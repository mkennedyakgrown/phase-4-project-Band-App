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
    instruments = db.relationship('Instrument', secondary='users_instruments', back_populates='members')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='member', cascade='all, delete-orphan')
    songs = association_proxy('songs_users_instruments', 'song')
    genres = association_proxy('member_bands', 'genre')

    serialize_rules = ('-owned_bands', '-instruments', '-songs_users_instruments', '-member_bands', '-songs', '-genres', '-_password_hash')

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

    serialize_rules = ('members', 'instruments', 'songs', 'genre')

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
    instruments = association_proxy('songs_users_instruments', 'instrument')
    members = association_proxy('songs_users_instruments', 'member')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='song', cascade='all, delete-orphan')

    serialize_rules = ('instruments', 'members', '-band', '-songs_users_instruments')

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

    members = db.relationship('User', secondary='users_instruments', back_populates='instruments')
    songs = association_proxy('songs_users_instruments', 'song')
    # bands = association_proxy('songs', 'band')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='instrument', cascade='all, delete-orphan')

    serialize_rules = ('-members', '-songs', '-songs_users_instruments')

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

    serialize_rules = ('-bands',)

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        elif self.query.filter_by(name=name).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name

class SongUserInstrument(db.Model, SerializerMixin):
    __tablename__ = 'songs_users_instruments'

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), nullable=False)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=True)
    instrument_id = db.Column('instrument_id', db.Integer, db.ForeignKey('instruments.id'), nullable=False)

    song = db.relationship('Song', back_populates='songs_users_instruments', uselist=False)
    member = db.relationship('User', back_populates='songs_users_instruments', uselist=False)
    instrument = db.relationship('Instrument', back_populates='songs_users_instruments', uselist=False)

    serialize_rules = ('-member', '-song', '-instrument')

        
users_bands = db.Table('users_bands',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('band_id', db.Integer, db.ForeignKey('bands.id'), primary_key=True)
)

users_instruments = db.Table('users_instruments',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('instrument_id', db.Integer, db.ForeignKey('instruments.id'), primary_key=True)
)