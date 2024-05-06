#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Band, Song, Instrument, Genre

class Login(Resource):
    
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        password = request.get_json()['password']
        if user is not None and user.authenticate(password) == True:
            session['user_id'] = user.id
            return {
               'id': user.id,
               'username': user.username,
               'email': user.email,
               'owned_bands': [band.to_dict() for band in user.owned_bands],
               'member_bands': [band.to_dict() for band in user.member_bands],
               'instruments': [instrument.to_dict() for instrument in user.instruments],
               'songs': [song.to_dict() for song in user.songs],
               'genres': [genre.to_dict() for genre in user.genres]
            }, 200
        else:
            return {'message': 'Username and password do not match any users'}, 401

class Logout(Resource):
    
    def delete(self):
        if session['user_id']:
            session['user_id'] = None
            return {'message': 'Successfully Logged Out'}, 204
        else:
            return {'message': 'Cannot logout: not logged in'}, 401



class Bands(Resource):

  def get(self):
    bands = Band.query.all()
    return [band.name for band in bands]
  
class Users(Resource):

  def get(self):
    users = User.query.all()
    return [user.username for user in users]
  
api.add_resource(Bands, '/bands')
api.add_resource(Users, '/users')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
