import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar } from './navbar'
import './computer/choose.css';

const ChooseColor = () => {
    return (
        <>
        <Navbar />
        <div className="choose-computer-container">
            <h2 className="choose-computer-heading">Choose the color you play with</h2>
            <div className="choose-computer-links">
                <Link to='/online/white' className="choose-computer-link">white</Link>
                <Link to='/online/black' className="choose-computer-link">black</Link>
            </div>
            <Outlet /> {/* This will render the selected child route */}
        </div>
        </>
    );
};

export default ChooseColor;
