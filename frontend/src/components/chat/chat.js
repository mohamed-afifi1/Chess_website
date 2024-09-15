import { useEffect, useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client'
import { useAuth } from '../../context/authContext';
import './chat.css';
import { useParams } from 'react-router-dom';
const socket = io('http://127.0.0.1:5000', { autoConnect: false });

function Chat() {
    socket.connect();
    const { userName } = useAuth();
    const [message, setMessage] = useState('');
    const [Chat, setChat] = useState([]);
    const { gameroom } = useParams();

    useEffect(() => {
        socket.on('message', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });
        return () => {
            socket.off();
        }
    }, [userName, Chat]);

    return (
        <div className='chat-container'>
            <div className='chat-box'>
                <ul className='messages'>
                    {Chat.map((msg, index) => (
                        <li key={index} className='message-item'>{msg}</li>
                    ))}
                </ul>
                <input
                    type='text'
                    className='message-input'
                    placeholder='Type your message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            socket.emit('sendMessage', { 'message': message, 'user': userName }, gameroom);
                            setMessage('');
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Chat;