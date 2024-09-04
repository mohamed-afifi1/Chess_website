#!/usr/bin/python3

""" Handling Routes for Authentication """



from flask import render_template, redirect, Blueprint, url_for, make_response, request
from flask_login import login_user,  login_required, logout_user
from database.db_manager import db, bcrypt, LoginForm, RegisterForm, User

app_blueprint = Blueprint('app_blueprint', __name__)


@app_blueprint.route('/')
def home():
    return render_template('home.html')


@app_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('app_blueprint.dashboard'))
    return render_template('login.html', form=form)



@app_blueprint.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    userID = request.args.get('userID')
    print(f"Received userID: {userID}")  # Debug statement
    response = make_response(redirect('http://localhost:3000'))
    return response
@app_blueprint.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('app_blueprint.login'))



@app_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('app_blueprint.login'))

    return render_template('register.html', form=form)
