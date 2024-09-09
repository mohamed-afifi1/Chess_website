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
