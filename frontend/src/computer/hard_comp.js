// const [lichessToken] = useState('lip_ECM6encOKT0kEivL4A17');  // Replace with your Lichess API token

import React, { useState } from 'react';
// import axios from 'axios';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import '../css-files/offline.css';
import { Navbar } from '../navbar';
import { AuthProvider } from '../AuthContext';

function HardComputer() {
    return (
        <>
        Hi Hard 
        </>
    )
}

export default HardComputer;
