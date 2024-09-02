import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './choose.css';

const ChooseComputer = () => {
    return (
        <div className="choose-computer-container">
            <h2 className="choose-computer-heading">Choose the level</h2>
            <div className="choose-computer-links">
                <Link to="easy_comp" className="choose-computer-link">Easy</Link>
                <Link to="hard_comp" className="choose-computer-link">Hard</Link>
            </div>
            <Outlet /> {/* This will render the selected child route */}
        </div>
    );
};

export default ChooseComputer;
