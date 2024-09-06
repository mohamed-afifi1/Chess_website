// const [lichessToken] = useState('lip_ECM6encOKT0kEivL4A17');  // Replace with your Lichess API token

import React, { useState } from 'react';
import axios from 'axios';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import '../css-files/offline.css';
import { Navbar } from '../navbar';
import { AuthProvider } from '../AuthContext';

function HardComputer() {
    /*
    const [game, setGame] = useState(new Chess());
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [lichessToken] = useState('lip_ECM6encOKT0kEivL4A17');  // Replace with your Lichess API token
    const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Track turn

    // Function to call Lichess Opening Explorer API to find the best move
    const findBestMove = async () => {
        try {
            console.log("Fetching best move from Lichess API...");

            // Use the correct Lichess API endpoint here
            const response = await axios.post(
                'https://lichess.org/api/board/game/ai',
                {
                    // Request body with game state details
                },
                {
                    headers: {
                        'Authorization': `Bearer ${lichessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Lichess API Response:", response.data);

            const bestMove = response.data.bestMove;  // Adjust based on actual API response
            if (bestMove) {
                console.log("Best move from Lichess:", bestMove);
                // Apply the move as needed
            } else {
                console.error("No valid best move returned from Lichess.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response from server:", error.response.data);
            } else if (error.request) {
                console.error("Error with request:", error.request);
            } else {
                console.error("Error:", error.message);
            }
        }
    };


    function drop(start, end, piece) {
        if (!isPlayerTurn) {
            console.log("Not the player's turn.");
            return false;
        }

        piece = piece.toLowerCase();
        piece = piece[1];

        let move = null;
        setGame((g) => {
            const copy = { ...g };
            move = copy.move({ from: start, to: end, promotion: piece });
            return copy;
        });

        if (move == null) {
            console.log("Invalid move.");
            return false;
        }

        console.log("Player move applied:", move);

        // Check if the game is over
        if (game.in_checkmate()) {
            setGameOver(true);
            setWinner("Checkmate! You won!");
        } else if (game.in_draw()) {
            setGameOver(true);
            setWinner("The game is a draw!");
        } else {
            // After the player's move, switch to the computer's turn and ask Lichess for the best move
            setIsPlayerTurn(false);
            findBestMove();
        }

        return true;
    }

    function restartGame() {
        console.log("Restarting game...");
        setGame(new Chess());
        setGameOver(false);
        setIsPlayerTurn(true);  // Reset to player's turn
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
    */
    return (
        <>
        Hi Hard 
        </>
    )
}

export default HardComputer;
