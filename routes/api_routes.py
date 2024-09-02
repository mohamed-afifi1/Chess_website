#!/usr/bin/python3

from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, Blueprint
from database.db_manager import db, bcrypt, LoginForm, RegisterForm, User

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([user for user in users])

