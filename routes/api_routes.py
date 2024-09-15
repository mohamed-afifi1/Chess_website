#!/usr/bin/python3
"""
API routes for the application
"""

from flask import request, jsonify, Blueprint
from database.db_manager import db, User

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/users', methods=['GET'])
def get_users():
    """
    return a list of users
    """
    data = request.args
    try:
        user = User.query.filter_by(username=data['username']).first()
        return jsonify({
            user.id: {
                'username': user.username,
                'Date': user.Date
            }
        })
    except Exception as e:
        users = User.query.all()
        dictionary_users = {}
        for user in users:
            dictionary_users[user.id] = {
                'username': user.username,
                'Date': user.Date
            }
        return jsonify(dictionary_users)


@api.route('/games', methods=['GET'])
def get_games():
    """
    return a list of games for a user.
    """
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
    """
    posting a game played by a user
    """
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        if not isinstance(user.games, list):
            user.games = []

        for game in user.games:
            if data['game']['date'][:19] == game['date'][:19]:
                return

        user.games.append(data['game'])
        db.session.commit()
        return jsonify({'message': 'Game added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
