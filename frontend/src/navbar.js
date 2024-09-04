import React from 'react';
import './App.css';
import { useAuth } from './AuthContext';

export function Navbar() {
  const { userId } = useAuth();
  return (
    <nav>
      <ul>
        <li><a href="http://127.0.0.1:5000/register">Register</a></li>
        <li><a href="http://127.0.0.1:5000/login">Login</a></li>
        <li><a href="http://127.0.0.1:5000">Home</a></li>
        <li><a href="http://127.0.0.1:5000/logout">{userId}</a></li>
      </ul>
    </nav>
  );
}