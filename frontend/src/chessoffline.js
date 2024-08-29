import React, { useState }from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import './App.css';
import { Navbar } from './navbar';



function ChessOffline() {
  const [game, setGame] = useState(new Chess());
  function drop (start, end, pro) {
    pro = pro.toLowerCase();
    pro = pro[1];
    console.log(start, end, pro);
    let copy = { ...game };
    
    copy.move({ from: start, to: end , promotion: pro})
    setGame(copy);
    return true;
  }
  return (
    <>
    <Navbar />
    <div className="board">
      <Chessboard position={game.fen()}
       onPieceDrop={ drop }
       customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
       customArrowColor='blue'
       />
    </div>
    </>
  );
}

export default ChessOffline;