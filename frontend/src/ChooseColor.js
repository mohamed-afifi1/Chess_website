import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar } from './navbar'
import './computer/choose.css';

const ChooseColor = () => {
    const [gameroom, setgameroom ] = useState('');
    const white = `/online/${gameroom}/white`;
    const black = `/online/${gameroom}/black`;
    return (
        <>
        <Navbar />
        <div className="choose-computer-container">
            <h2 className="choose-computer-heading">Enter Game Code</h2>
            <div className="choose-computer-links">
                <input type='text'
                placeholder='Enter the game room (make it unique as possible)'
                className='room-input'
                onChange={(text) => {setgameroom(text.target.value)}} />
                <Link to={white} className="choose-computer-link">white</Link>
                <Link to={black} className="choose-computer-link">black</Link>
            </div>
            <Outlet /> {/* This will render the selected child route */}
        </div>
        </>
    );
};

export default ChooseColor;
