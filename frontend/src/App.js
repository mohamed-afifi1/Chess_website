import React from 'react';
import { Link } from 'react-router-dom';
import './css-files/home.css';
import { Navbar } from './navbar';

export default function App() {

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="app-links">
          <Link to="/offline" className="app-link">Offline</Link>
          <Link to="/online" className="app-link">Online</Link>
          <Link to="/computer" className="app-link">Computer</Link>
        </div>
      </div>
    </>
  );
}
