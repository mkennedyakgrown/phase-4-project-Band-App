from config import app, db
from models import User, Band, Song, Instrument, Genre, users_bands, songs_users_instruments

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
  user2.password_hash = 'password'
  users.append(user2)

  return users

def create_bands():
  band = Band()
  band.name='The Rolling Stones'
  band.owner_id=1
  band.genre_id=1

  return [band]

def create_songs():
  song = Song()
  song.name='Satisfaction'
  song.band_id=1

  return [song]

def create_instruments():
  instrument = Instrument()
  instrument.name = 'Guitar'

  return [instrument]

def create_genres():
  genre = Genre()
  genre.name = 'Rock'

  return [genre]

if __name__ == "__main__":
  with app.app_context():
    
    with app.app_context():
      print("Clearing db...")
      User.query.delete()
      Band.query.delete()
      Song.query.delete()
      Instrument.query.delete()
      Genre.query.delete()
      db.session.query(users_bands).delete()
      db.session.query(songs_users_instruments).delete()
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
      for user in users:
        user.member_bands.append(bands[0])
      for band in bands:
        band.members.append(users[1])
      db.session.commit()

      print('Seeding songs_users_instruments...')
      for song in songs:
        song.instruments.append(instruments[0])
        instruments[0].songs.append(song)
        song.users.append(users[0])
        users[0].songs.append(song)
        instruments[0].users.append(users[0])
      db.session.commit()

      print('Done!')