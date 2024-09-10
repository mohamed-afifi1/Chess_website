#!/usr/bin/python3

from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, Blueprint
from database.db_manager import db, bcrypt, LoginForm, RegisterForm, User

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/users', methods=['GET'])
def get_users():
    data = request.args
    try:
        user = User.query.filter_by(username=data['username']).first()
        return jsonify({user.id:{ 'username': user.username, 'Date': user.Date }})
    except Exception as e:
        users = User.query.all()
        dictionary_users = {}
        for user in users:
            dictionary_users[user.id] = {'username': user.username, 'Date': user.Date}
        return jsonify(dictionary_users)


@api.route('/games', methods=['GET'])
def get_games():
    data = request.args
    try:
        user = User.query.filter_by(username=data['username']).first()
        return jsonify({user.username: user.games})
    except Exception as e:
        users = User.query.all()
        dictionary_games = {}
        for user in users:
            dictionary_games[user.username] = user.games
        return jsonify(dictionary_games)


@api.route('/games', methods=['POST'])
def add_game():
    ### the request should be {
    #    'username': 'username',
    ##    'game': {'gameroom': str, 'state': win or lose or draw, 'state': 0-1 or 1-0 or 1/2-1/2, 'date': datetime.now }  
    ##}
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        user.games.append(data['game'])
        db.session.commit()
        return jsonify({'message': 'Game added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})
