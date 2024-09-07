import { useEffect, useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { Navbar } from './navbar';
import { useParams } from 'react-router-dom';
import './css-files/online.css';
import Chat from './chat';

export const socket = io('http://127.0.0.1:5000', { autoConnect: false });

function Online() {
  const { color } = useParams();
  socket.connect();
  socket.on('connect', function () {
    console.log('Connected to server');
  });
  const [game, setGame] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  function drop(start, end, pro) {
    if ((game.turn() === 'w' && color === 'white') || (game.turn() === 'b' && color === 'black')) {
      pro = pro.toLowerCase();
      pro = pro[1];
      let move = null;

      setGame((g) => {
        const copy = { ...g };
        move = copy.move({ from: start, to: end, promotion: pro });
        socket.emit('move', copy.fen());
        return copy;
      });

      if (move == null) return false;

      if (game.in_checkmate()) {
        setGameOver(true);
        setWinner("Checkmate! You won!");
      } else if (game.in_draw()) {
        setGameOver(true);
        setWinner("The game is a draw!");
      }
    }
    return true;
  }

  useEffect(() => {
    socket.on('make_move', function (fen) {
      const copy = new Chess(fen);
      setGame(copy);
    });

    return () => {
      socket.off('make_move');
    };
  }, []);

  function restartGame() {
    setGame(new Chess());
    setGameOver(false);
  }

  return (
    <>
      <Navbar />
      <div className="online-container">
        <div className="chess-board">
          <Chessboard
            position={game.fen()}
            onPieceDrop={drop}
            customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
            customArrowColor="blue"
            boardOrientation={color}
          />
        </div>
        <div className="online-chat">
          <Chat />
        </div>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>{winner}</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </>
  );
}

export default Online;
