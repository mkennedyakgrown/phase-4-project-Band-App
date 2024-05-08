from config import app, db
from models import User, Band, Song, Instrument, Genre, SongUserInstrument, users_bands, users_instruments

def create_users():
  users = []
  user1 = User()
  user1.username='John Doe'
  user1.password_hash='password'
  user1.email='johndoe@me.com'
  users.append(user1)

  user2 = User(
    username='Jane Doe',
    email='janedoe@me.com'
  )
  user2.password_hash = 'password_isa-Dumb0-Password'
  users.append(user2)

  user3 = User(
    username='Keith Richards',
    email='keith@me.com'
  )
  user3.password_hash = 'guitar'
  users.append(user3)

  user4 = User(
    username='Percy McNeally',
    email='percy@me.com'
  )
  user4.password_hash = 'lightning-thief'
  users.append(user4)

  user5 = User(
    username='Dave Grohl',
    email='dave@me.com'
  )
  user5.password_hash = 'MyHeRo'
  users.append(user5)

  user6 = User(
    username='Mick Jagger',
    email='mick@me.com'
  )
  user6.password_hash = 'black__betty'
  users.append(user6)

  return users

def create_bands():
  bands = []
  band1 = Band(
    name='The Rolling Stones',
    owner_id=1,
    genre_id=1
  )
  bands.append(band1)

  band2 = Band(
    name='The Clash',
    owner_id=2,
    genre_id=1
  )
  bands.append(band2)

  band3 = Band(
    name='The Beatles',
    owner_id=3,
    genre_id=1
  )
  bands.append(band3)

  band4 = Band(
    name='The Doors',
    owner_id=5,
    genre_id=1
  )
  bands.append(band4)

  band5 = Band(
    name='3 Doors Down',
    owner_id=6,
    genre_id=2
  )
  bands.append(band5)

  band6 = Band(
    name='Nickel Creek',
    owner_id=4,
    genre_id=4
  )
  bands.append(band6)

  band7 = Band(
    name='Strings Theory',
    owner_id=5,
    genre_id=5
  )
  bands.append(band7)
  

  return bands

def create_songs():
  songs = [
    Song(
      name='Satisfaction',
      band_id=1
    ),
    Song(
      name='Paint It Black',
      band_id=1
    ),
    Song(
      name='Sweet Caroline',
      band_id=2
    ),
    Song(
      name='Revolution',
      band_id=3
    ),
    Song(
      name='The Ballad of John and Yoko',
      band_id=5
    ),
    Song(
      name='I Will Always Love You',
      band_id=4
    ),
    Song(
      name='Kryptonite',
      band_id=5
    )
  ]

  return songs

def create_instruments():
  instruments = [
    Instrument(name = 'Guitar'),
    Instrument(name = 'Piano'),
    Instrument(name = 'Drums'),
    Instrument(name = 'Bass'),
    Instrument(name = 'Vocals'),
    Instrument(name = 'Keyboard'),
    Instrument(name = 'Saxophone'),
    Instrument(name = 'Trumpet'),
    Instrument(name = 'Flute'),
    Instrument(name = 'Cello'),
    Instrument(name = 'Harmonica'),
    Instrument(name = 'Percussion'),
  ]

  return instruments

def create_genres():
  genres = [
  Genre(name = 'Rock'),
  Genre(name = 'Jazz'),
  Genre(name = 'Pop'),
  Genre(name = 'Folk'),
  Genre(name = 'Classical')
  ]

  return genres

if __name__ == "__main__":
  with app.app_context():
    
    with app.app_context():
      print("Clearing db...")
      User.query.delete()
      Band.query.delete()
      Song.query.delete()
      Instrument.query.delete()
      Genre.query.delete()
      SongUserInstrument.query.delete()
      db.session.query(users_bands).delete()
      db.session.query(users_instruments).delete()
      db.session.commit()


      print("Seeding users...")
      users = create_users()
      db.session.add_all(users)
      db.session.commit()

      print("Seeding bands...")
      bands = create_bands()
      db.session.add_all(bands)
      db.session.commit()

      print("Seeding songs...")
      songs = create_songs()
      db.session.add_all(songs)
      db.session.commit()

      print("Seeding genres...")
      genres = create_genres()
      db.session.add_all(genres)
      db.session.commit()

      print('Seeding instruments...')
      instruments = create_instruments()
      db.session.add_all(instruments)
      db.session.commit()

      print('Seeding members...')
      users = User.query.all()
      bands = Band.query.all()
      for user in users:
        user.member_bands.append(bands[0])
      for band in bands:
        band.members.append(users[0])
        band.members.append(users[1])
        band.members.append(users[2])
        band.members.append(users[3])
        band.members.append(users[4])
        band.members.append(users[5])
      db.session.commit()

      print('Seeding songs_users_instruments...')
      song = Song.query.first()
      user = User.query.first()
      instrument = Instrument.query.first()
      song_user_instrument = SongUserInstrument(
        song_id=song.id,
        user_id=user.id,
        instrument_id=instrument.id
      )
      db.session.add(song_user_instrument)
      db.session.commit()

      print('Seeding users_instruments...')
      users = User.query.all()
      instrument = Instrument.query.first()
      for user in users:
        user.instruments.append(instrument)
      db.session.commit()

      print('Done!')