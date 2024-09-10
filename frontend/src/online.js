import { useEffect, useState } from 'react';
import React from 'react';
import { io } from 'socket.io-client';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { Navbar } from './navbar';
import { useParams } from 'react-router-dom';
import './css-files/online.css';
import Chat from './chat';
import { postGameData } from './handleApi'; // Import postGameData
import { useAuth } from './AuthContext';



export const socket = io('http://127.0.0.1:5000', { autoConnect: false });

function Online() {
  const { userId } = useAuth();
  const { color, gameroom } = useParams();
  console.log(gameroom);
  socket.connect();
  socket.on('connect', function () {
    console.log('Connected to server');
  });
  socket.emit('joingame', gameroom)
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
        socket.emit('move', copy.fen(), gameroom);
        return copy;
      });

      if (move == null) return false;
    }
    return true;
  }

  useEffect(() => {
    socket.on('make_move', function (fen) {
      const copy = new Chess(fen);
      setGame(copy);
    }
    );
    return () => {
      socket.off('make_move');
    };
  }, [game]);
  console.log("My color: ", color)
  console.log("My turn: ", game.turn())

  useEffect(() => {
    if (game.in_checkmate()) {
      console.log('++++ in_checkmate ++++')
      setGameOver(true);
      setWinner("Checkmate!");
      if (game.turn() === color.substring(0, 1)) {
        postGameData(userId, gameroom, "lost", new Date().toISOString())
        console.log('++++ in_checkmate1 ++++')
      } else {
        postGameData(userId, gameroom, "win", new Date().toISOString())
        console.log('++++ in_checkmate2 ++++')
      }

    } else if (game.in_draw()) {
      console.log('++++ draw ++++')
      setGameOver(true);
      setWinner("The game is a draw!");
      postGameData(userId, gameroom, "draw", new Date().toISOString())
    }
  },[game]);


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
