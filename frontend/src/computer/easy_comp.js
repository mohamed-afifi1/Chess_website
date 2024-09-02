import './comp.css';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar';

function EasyComputer() {
    const [game, setGame] = useState(new Chess());
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const navigate = useNavigate();

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    function makeRandomMove() {
        const possibleMove = game.moves();
        if (game.game_over() || game.in_draw() || possibleMove.length === 0) return;
        const randomIndex = Math.floor(Math.random() * possibleMove.length);
        safeGameMutate((game) => {
            game.move(possibleMove[randomIndex]);
        });
    }

    function onDrop(source, target) {
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: source,
                to: target,
                promotion: 'q',
            });
        });

        if (move == null) return false;

        if (game.in_checkmate()) {
            setGameOver(true);
            setWinner("Checkmate! You won!");
        } else if (game.in_draw()) {
            setGameOver(true);
            setWinner("The game is a draw!");
        }

        setTimeout(makeRandomMove, 200);
        return true;
    }

    function restartGame() {
        setGame(new Chess());
        setGameOver(false);
    }

    return (
        <>
            <Navbar />
            <div className="easy-computer-container">
                {gameOver && (
                    <div className="easy-computer-game-over-screen">
                        <h2>{winner}</h2>
                        <button onClick={() => navigate('/')}>Home</button>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                )}
                <div className="easy-computer-board">
                    <Chessboard
                        position={game.fen()}
                        onPieceDrop={onDrop}
                        customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
                        customArrowColor="blue"
                    />
                </div>
            </div>
        </>
    );
}

export default EasyComputer;
