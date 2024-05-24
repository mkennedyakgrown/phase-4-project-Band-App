from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import ForeignKey
from re import search

from config import db, bcrypt
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)

    owned_bands = db.relationship('Band', back_populates='owner', cascade='all, delete-orphan')
    member_bands = db.relationship('Band', secondary='users_bands', back_populates='members')
    instruments = db.relationship('Instrument', secondary='users_instruments', back_populates='members')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='member', cascade='all, delete-orphan')
    songs = association_proxy('songs_users_instruments', 'song')
    genres = association_proxy('member_bands', 'genre')

    serialize_rules = ('-owned_bands', 'instruments', '-songs_users_instruments', '-member_bands', '-songs', '-genres', '-_password_hash')

    @validates('username')
    def validate_username(self, key, name):
        if name == '':
            raise ValueError('Username cannot be empty')
        elif len(name) < 3:
            raise ValueError('Username must be at least 3 characters long')
        elif len(name) > 20:
            raise ValueError('Username must be less than 20 characters long')
        elif type(name) is not str:
            raise ValueError('Username must be a string')
        elif ' ' in name:
            raise ValueError('Username cannot contain spaces')
        elif self.query.filter_by(username=name).first() is not None and name != self.username:
            raise ValueError('This name already exists')
        else:
            return name
        
    @validates('first_name')
    def validate_first_name(self, key, name):
        if name == '':
            raise ValueError('First name cannot be empty')
        elif len(name) > 20:
            raise ValueError('First name must be less than 20 characters long')
        elif type(name) is not str:
            raise ValueError('First name must use letters only')
        elif ' ' in name:
            raise ValueError('First name cannot contain spaces')
        elif search(r"[^\w]", name):
            raise ValueError('First name cannot contain special characters')
        else:
            return name.capitalize()

    @validates('last_name')
    def validate_last_name(self, key, name):
        if name == '':
            raise ValueError('Last name cannot be empty')
        elif len(name) > 20:
            raise ValueError('Last name must be less than 20 characters long')
        elif type(name) is not str:
            raise ValueError('Last name must use letters only')
        elif ' ' in name:
            raise ValueError('Last name cannot contain spaces')
        elif search(r"[^\w]", name):
            raise ValueError('First name cannot contain special characters')
        else:
            return name.capitalize()

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
    name = db.Column(db.String, unique=True, nullable=False)
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
        elif len(name) < 3:
            raise ValueError('Name must be at least 3 characters long')
        elif len(name) > 20:
            raise ValueError('Name must be less than 20 characters long')
        elif type(name) is not str:
            raise ValueError('Name must be a string')
        elif self.query.filter_by(name=name).first() is not None and name != self.name:
            raise ValueError('This name already exists')
        else:
            return name
        
    @validates('genre_id')
    def validate_genre_id(self, key, genre_id):
        if genre_id == '':
            raise ValueError('Genre cannot be empty')
        elif type(genre_id) is not int:
            raise ValueError('Genre must be an integer')
        elif Genre.query.filter_by(id=genre_id).first() is None:
            raise ValueError('This genre does not exist')
        else:
            return genre_id

    @validates('owner_id')
    def validate_owner_id(self, key, owner_id):
        if not owner_id:
            raise ValueError('Owner cannot be empty')
        elif type(owner_id) is not int:
            raise ValueError('Owner must be an integer')
        elif User.query.filter_by(id=owner_id).first() is None:
            raise ValueError('This owner does not exist')
        else:
            return owner_id
        
class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    band_id = db.Column(db.Integer, ForeignKey('bands.id'))


    band = db.relationship('Band', back_populates='songs', uselist=False)
    instruments = association_proxy('songs_users_instruments', 'instrument')
    members = association_proxy('songs_users_instruments', 'member')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='song', cascade='all, delete-orphan')

    serialize_rules = ('instruments', 'members', '-band', 'songs_users_instruments')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty')
        elif len(name) > 50:
            raise ValueError('Name must be less than 50 characters long')
        elif type(name) is not str:
            raise ValueError('Name must be a string')
        elif self.query.filter_by(name=name).first() is not None:
            if (self.query.filter_by(name=name, band_id=self.band_id).first().band_id == self.band_id):
                raise ValueError('This name and band combination already exists')
        else:
            return name
        
    @validates('band_id')
    def validate_band_id(self, key, band_id):
        if not band_id:
            raise ValueError('Band cannot be empty')
        elif type(band_id) is not int:
            raise ValueError('Band must be an integer')
        elif Band.query.filter_by(id=band_id).first() is None:
            raise ValueError('This band does not exist')
        else:
            return band_id
        
class Instrument(db.Model, SerializerMixin):
    __tablename__ = 'instruments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    members = db.relationship('User', secondary='users_instruments', back_populates='instruments')
    songs = association_proxy('songs_users_instruments', 'song')
    songs_users_instruments = db.relationship('SongUserInstrument', back_populates='instrument', cascade='all, delete-orphan')

    serialize_rules = ('-members', '-songs', '-songs_users_instruments')

    @validates('name')
    def validate_name(self, key, name):
        if name == '':
            raise ValueError('Name cannot be an empty string')
        elif type(name) is not str:
            raise ValueError('Name must be a string')
        elif len(name) > 20:
            raise ValueError('Name must be less than 20 characters long')
        elif self.query.filter_by(name=name.capitalize()).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name.capitalize()
        
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
        elif type(name) is not str:
            raise ValueError('Name must be a string')
        elif len(name) < 2:
            raise ValueError('Name must be at least 2 characters long')
        elif len(name) > 20:
            raise ValueError('Name must be less than 20 characters long')
        elif self.query.filter_by(name=name.capitalize()).first() is not None:
            raise ValueError('This name already exists')
        else:
            return name.capitalize()

class SongUserInstrument(db.Model, SerializerMixin):
    __tablename__ = 'songs_users_instruments'

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), nullable=False)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=True)
    instrument_id = db.Column('instrument_id', db.Integer, db.ForeignKey('instruments.id'), nullable=False)
    notes = db.Column(db.String, nullable=True)

    song = db.relationship('Song', back_populates='songs_users_instruments', uselist=False)
    member = db.relationship('User', back_populates='songs_users_instruments', uselist=False)
    instrument = db.relationship('Instrument', back_populates='songs_users_instruments', uselist=False)

    serialize_rules = ('-member', '-song', 'instrument')

    @validates('notes')
    def validate_notes(self, key, notes):
        if type(notes) is not str:
            raise ValueError('Notes must be a string')
        elif len(notes) > 100:
            raise ValueError('Notes must be less than 100 characters long')
        else:
            return notes
        
    @validates('instrument_id')
    def validate_instrument_id(self, key, instrument_id):
        if not instrument_id:
            raise ValueError('Instrument cannot be empty')
        elif type(instrument_id) is not int:
            raise ValueError('Instrument must be an integer')
        elif Instrument.query.filter_by(id=instrument_id).first() is None:
            raise ValueError('This instrument does not exist')
        else:
            return instrument_id
        
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise ValueError('User cannot be empty')
        elif type(user_id) is not int:
            raise ValueError('User must be an integer')
        elif User.query.filter_by(id=user_id).first() is None:
            raise ValueError('This user does not exist')
        else:
            return user_id
        
    @validates('song_id')
    def validate_song_id(self, key, song_id):
        if not song_id:
            raise ValueError('Song cannot be empty')
        elif type(song_id) is not int:
            raise ValueError('Song must be an integer')
        elif Song.query.filter_by(id=song_id).first() is None:
            raise ValueError('This song does not exist')
        else:
            return song_id

    


        
users_bands = db.Table('users_bands',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('band_id', db.Integer, db.ForeignKey('bands.id'), primary_key=True)
)

users_instruments = db.Table('users_instruments',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('instrument_id', db.Integer, db.ForeignKey('instruments.id'), primary_key=True)
)