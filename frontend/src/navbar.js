import React, {useEffect, useState} from 'react';
import './App.css';
import { useAuth } from './AuthContext';

export function Navbar() {
  const { userId } = useAuth();
  const [ username, setusername ] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setusername(data[userId]?.username || '');})
      .catch((error) => console.error(error));
  }, []);
  return (
    <nav>
      <ul>
        <li><a href="http://127.0.0.1:5000/register">Register</a></li>
        <li><a href="http://127.0.0.1:5000/login">Login</a></li>
        <li><a href="http://127.0.0.1:5000">Home</a></li>
        <li><a href="http://127.0.0.1:5000/logout">{username['username']}</a></li>
      </ul>
    </nav>
  );
}