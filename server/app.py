#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import pdb

from config import app, db, api
from models import User, Band, Song, Instrument, Genre

class Signup(Resource):
    
    def post(self):
        json = request.get_json()
        user = User(
          username=json.get('username', ''),
          email=json.get('email', '')
        )
        user.password_hash = json.get('password', '')
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user_dict(user), 201
        except:
            return {'message': 'Error creating user'}, 422

class Login(Resource):
    
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']
        if user is not None and user.authenticate(password) == True:
            session['user_id'] = user.id
            return user_dict(user), 200
        else:
            return {'message': 'Username and password do not match any users'}, 401

class Logout(Resource):
    
    def delete(self):
        if session['user_id']:
            session['user_id'] = None
            return {'message': 'Successfully Logged Out'}, 204
        else:
            return {'message': 'Cannot logout: not logged in'}, 401

class CheckSession(Resource):
   
   def get(self):
      user_id = session['user_id']
      if user_id:
         user = User.query.filter(User.id == user_id).first()
         return user_dict(user), 200
      else:
         return {'message': 'Not logged in'}, 401

class Bands(Resource):

  def get(self):
    bands = Band.query.all()
    return [band.to_dict() for band in bands]
  
  def post(self):
    name = request.get_json()['name']
    genre_id = request.get_json()['genre_id']
    owner_id = session['user_id']
    band = Band(name=name, genre_id=genre_id, owner_id=owner_id)
    band.members.append(User.query.filter_by(id=owner_id).first())
    db.session.add(band)
    db.session.commit()
    return band.to_dict()
  
class BandById(Resource):
  
  def get(self, band_id):
    band = Band.query.filter_by(id=band_id).first()
    band_dict = band.to_dict()
    band_dict['members'] = [user_dict(user) for user in band.members]
    return band_dict
  
class BandMembers(Resource):
   
  def patch(self, band_id, user_id):
    band = Band.query.filter_by(id=band_id).first()
    user = User.query.filter_by(id=user_id).first()
    if user not in band.members:
      band.members.append(user)
    else:
      band.members.remove(user)
    db.session.commit()
    return user_dict(user)

class BandsByUserId(Resource):

  def get(self, user_id):
    bands = User.query.filter_by(id=user_id).first().member_bands
    return [band.to_dict() for band in bands]
  
class BandByName(Resource):
  
  def get(self, name):
    band = Band.query.filter_by(name=name).first()
    return band.to_dict()
  
class Users(Resource):

  def get(self):
    users = User.query.all()
    return [user_dict(user) for user in users]
  
class UserById(Resource):
  
  def get(self, user_id):
    return user_dict(User.query.filter_by(id=user_id).first())

  def patch(self, user_id):
    user = User.query.filter_by(id=user_id).first()
    json = request.get_json()
    if json.get('username'):
      user.username = json.get('username')
    if json.get('email'):
      user.email = json.get('email')
    if json.get('instruments'):
      user.instruments = [Instrument.query.filter_by(id=instrument['id']).first() for instrument in json.get('instruments')]
    db.session.commit()
    
    session['user_id'] = user.id
    return user_dict(user)
  
  def delete(self, user_id):
    user = User.query.filter_by(id=user_id).first()
    db.session.delete(user)
    db.session.commit()
    session['user_id'] = None
    return {'message': 'User deleted'}, 204
  
class UserByUsername(Resource):
  
  def get(self, username):
    return user_dict(User.query.filter_by(username=username).first())

class Genres(Resource):
  
  def get(self):
    genres = Genre.query.all()
    return [genre.to_dict() for genre in genres]
  
class Instruments(Resource):
  
  def get(self):
    instruments = Instrument.query.all()
    return [instrument.to_dict() for instrument in instruments]
  
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Bands, '/bands')
api.add_resource(BandById, '/bands/<int:band_id>')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:user_id>')
api.add_resource(UserByUsername, '/users/<string:username>')
api.add_resource(BandsByUserId, '/users/bands/<int:user_id>')
api.add_resource(BandMembers, '/bands/<int:band_id>/members/<int:user_id>')
api.add_resource(Genres, '/genres')
api.add_resource(Instruments, '/instruments')

def user_dict(user):
  return {
    'id': user.id,
    'username': user.username,
    'email': user.email,
    'owned_bands': [band.to_dict() for band in user.owned_bands],
    'member_bands': [band.to_dict() for band in user.member_bands],
    'instruments': [instrument.to_dict() for instrument in user.instruments],
    'songs': [song.to_dict() for song in user.songs],
    'genres': [genre.to_dict() for genre in user.genres]
  }

if __name__ == "__main__":
  app.run(port=5555, debug=True)
