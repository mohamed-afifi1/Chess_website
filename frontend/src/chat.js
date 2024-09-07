import { useEffect, useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext';
import './css-files/chat.css';
const socket = io('http://127.0.0.1:5000', { autoConnect: false });


function Chat() {
    socket.connect();
    const { userId } = useAuth();
    const [message, setMessage] = useState('');
    const [Chat , setChat ] = useState([]);

    useEffect(() => {
        socket.on('message', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });
        return () => {
            socket.off();
        }
    }, [userId, Chat]);
    return (
        <div className='Chat'>
            <input 
                type='text' 
                placeholder='Type your message...' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        socket.emit('sendMessage', {'message':message, 'user' : userId});
                        setMessage('');
                    }
                }}
            />
            <ul className='messages'>
                {
                    Chat.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))
                }
            </ul>
        </div>  
    )
}

export default Chat;