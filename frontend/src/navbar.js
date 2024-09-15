import React from 'react';
import './styles/App.css';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';

export function Navbar() {
  const { userName } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to='/'>home</Link></li>
        <li><Link to='/profile'>{userName}</Link></li>
        <li><a href="http://127.0.0.1:5000/logout">Logout</a></li>
      </ul>
    </nav>
  );
}