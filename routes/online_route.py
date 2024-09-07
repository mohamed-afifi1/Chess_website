#!/usr/bin/python3

""" Handling Routes for Authentication """



from flask import render_template, redirect, Blueprint, url_for
from flask_socketio import SocketIO, emit

Socketio = SocketIO(cors_allowed_origins="http://localhost:3000")
username = 'user1'
@Socketio.on('connect')
def connect():
    print('Client connected')

@Socketio.on('move')
def move(data):
    emit('make_move', data, broadcast=True, include_self=True)
@Socketio.on('sendMessage')
def send_message(message):
    final_mesg = message['user'] +': '+ message['message']
    emit('message', final_mesg, broadcast=True)