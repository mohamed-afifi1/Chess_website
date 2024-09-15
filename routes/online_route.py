#!/usr/bin/python3

"""Handling Routes for Socket.IO Authentication"""

from flask import render_template, redirect, Blueprint, url_for
from flask_socketio import SocketIO, emit, join_room

# Initialize SocketIO with CORS.
socketio = SocketIO(cors_allowed_origins="http://localhost:3000")

# Placeholder username for the connection.
username = 'user1'


@socketio.on('connect')
def connect():
    """
    Handle client connection to the server.
    """
    print('Client connected')


@socketio.on('joingame')
def join(gameroom):
    """
    Allow the client join a specific game room.    
    Args:
        gameroom (str): The room identifier.
    """
    join_room(gameroom)


@socketio.on('move')
def move(data, gameroom):
    """
    Handle the game move event and broadcast it to the room.
    
    Args:
        data (dict): The move data from the client.
        gameroom (str): The room identifier.
    """
    emit('make_move', data, room=gameroom)


@socketio.on('sendMessage')
def send_message(message, gameroom):
    """
    Handle sending the message within a game room.
    
    Args:
        message (dict): Contains the "user" and "message" fields.
        gameroom (str): The room identifier where the message is broadcast.
    """
    final_msg = f"{message['user']}: {message['message']}"
    emit('message', final_msg, broadcast=True)
