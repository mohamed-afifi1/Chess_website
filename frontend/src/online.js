import { useEffect, useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import { Chessboard } from'react-chessboard';
import { Chess } from 'chess.js';
import { Navbar } from './navbar'

export const socket = io('http://127.0.0.1:5000', {autoConnect: false});


function Online(){
    socket.connect()
    socket.on('connect', function() {
        console.log('Connected to server');
    });

    const [game, setGame] = useState(new Chess());
    function drop (start, end, pro) {
      pro = pro.toLowerCase();
      pro = pro[1];
      let copy = { ...game };
      copy.move({ from: start, to: end , promotion: pro})
      socket.emit('move', copy.fen());
      return true;
    }
    useEffect(() => {
      socket.on('make_move', function(fen) {
        const copy = new Chess(fen);
        setGame(copy);
      });

      return () => {
        socket.off('update');
      }
    });

    return (
      <>
      <Navbar />
      <div className="board">
        <Chessboard position={game.fen()}
         onPieceDrop={ drop }
         customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
         customArrowColor='blue'
         />
         {game.in_checkmate() ? <h1>Checkmate</h1> : null}
         {game.in_draw() ? <h1>Draw</h1> : null}
      </div>
      
      </>
    );
}

export default Online;