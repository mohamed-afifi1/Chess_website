import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function Navbar() {
  const { userId } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to='/'>home</Link></li>
        <li><Link to='/profile'>{userId}</Link></li>
        <li><a href="http://127.0.0.1:5000/logout">Logout</a></li>
      </ul>
    </nav>
  );
}