import React from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import { Navbar } from './navbar';

export default function App() {

  return (
    <>
    <Navbar />
      <div className="App">
        <div className='links'>
          <Link to="/offline">Offline</Link>
          <Link to="/online">Online</Link>
          <Link to="/computer">Computer</Link>
      </div>
      </div>
    </>
  );
}

