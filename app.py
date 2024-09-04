from flask import Flask
from routes.auth_routes import app_blueprint
from database.db_manager import db, bcrypt, login_manager
from routes.online_route import Socketio
from routes.api_routes import api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Configure application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'thisisasecretkey'

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
Socketio.init_app(app)
login_manager.init_app(app)

app.register_blueprint(app_blueprint)
app.register_blueprint(api)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    Socketio.run(app, debug=True, port=5000)
