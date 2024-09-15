#!/usr/bin/python3

"""Handling Routes for Authentication"""

from flask import (render_template, redirect, Blueprint, url_for,
                   make_response, request)
from flask_login import login_user, login_required, logout_user
from database.db_manager import db, bcrypt, LoginForm, RegisterForm, User
from datetime import datetime

app_blueprint = Blueprint('app_blueprint', __name__)


@app_blueprint.route('/')
def home():
    """
    Our home page.
    """
    return render_template('home.html')


@app_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    """
    for login purposes
    """
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('app_blueprint.chess',
                                    username=user.username))
    return render_template('login.html', form=form)


@app_blueprint.route('/chess', methods=['GET', 'POST'])
@login_required
def chess():
    """
    the app game
    """
    user_name = request.args.get('username')
    response = make_response(
        redirect(f'http://localhost:3000?username={user_name}')
    )
    return response


@app_blueprint.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    """
    to log out a user
    """
    logout_user()
    return redirect(url_for('app_blueprint.login'))


@app_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    """
    for registration.
    """
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        new_user = User(username=form.username.data,
                        password=hashed_password,
                        Date=datetime.now())
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('app_blueprint.login'))

    return render_template('register.html', form=form)
