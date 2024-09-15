import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import './chessOffline.css';
import { Navbar } from '../../navbar';
import { AuthProvider } from '../../context/authContext';

function ChessOffline() {
  const [game, setGame] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  function drop(start, end, pro) {
    pro = pro.toLowerCase();
    pro = pro[1];
    let move = null;

    setGame((g) => {
      const copy = { ...g };
      move = copy.move({ from: start, to: end, promotion: pro });
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

    return true;
  }

  function restartGame() {
    setGame(new Chess());
    setGameOver(false);
  }

  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="chess-offline-container">
          {gameOver && (
            <div className="chess-offline-game-over-screen">
              <h2>{winner}</h2>
              <button onClick={restartGame}>Restart Game</button>
            </div>
          )}
          <div className="chess-offline-board">
            <Chessboard
              position={game.fen()}
              onPieceDrop={drop}
              customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
              customArrowColor="blue"
            />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default ChessOffline;
