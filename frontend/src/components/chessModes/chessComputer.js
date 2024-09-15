import './chessComputer.css';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useAuth } from '../../context/authContext';
import { postGameData } from '../../api/apiHandler';
import { Chess } from 'chess.js';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../navbar';

function Computer() {
    const { userName } = useAuth(); // Retrieve userName from authentication context
    const [game, setGame] = useState(new Chess()); // Initialize chess game state
    const [gameOver, setGameOver] = useState(false); // Track if the game is over
    const [winner, setWinner] = useState(''); // Track the winner 
    const navigate = useNavigate(); // Hook for navigating between routes

    // Safely mutate the game state
    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g }; // Clone the game object to avoid direct mutation
            modify(update); // Apply the modifications
            return update; // Return the updated game object
        });
    }

    // Make a random move for the computer
    function makeRandomMove() {
        const possibleMove = game.moves(); // Get all possible moves
        if (game.game_over() || game.in_draw() || possibleMove.length === 0) return; // Exit if game is over or draw
        const randomIndex = Math.floor(Math.random() * possibleMove.length); // Pick a random move
        safeGameMutate((game) => {
            game.move(possibleMove[randomIndex]); // Make the random move
        });
    }

    // Handle the event when a piece is dropped on the board
    function onDrop(source, target) {
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: source, // Source square of the move
                to: target,   // Target square of the move
                promotion: 'q', // Auto promote pawn to queen
            });
        });

        if (move == null) return false; // Invalid move

        // Check for game over conditions
        if (game.in_checkmate()) {
            setGameOver(true); // Set game over state
            setWinner("Checkmate! You won!"); // Set the winner message
            postGameData(userName, "Computer", "win", new Date().toISOString()); // Post game data to the server
        } else if (game.in_draw()) {
            setGameOver(true); // Set game over state
            setWinner("The game is a draw!"); // Set the draw message
            postGameData(userName, "Computer", "draw", new Date().toISOString()); // Post game data to the server
        }

        setTimeout(makeRandomMove, 200); // Make a random move after a short delay
        return true;
    }

    // Restart the game
    function restartGame() {
        setGame(new Chess()); // Reset the chess game state
        setGameOver(false); // Reset the game over state
    }

    return (
        <>
            <Navbar /> {/* Render the Navbar */}
            <div className="easy-computer-container"> {/* Container for the game */}
                {gameOver && ( // Display the game over screen if game is over
                    <div className="easy-computer-game-over-screen">
                        <h2>{winner}</h2> {/* Display the winner message */}
                        <button onClick={() => navigate('/')}>Home</button> {/* Button to navigate to home */}
                        <button onClick={restartGame}>Restart Game</button> {/* Button to restart the game */}
                    </div>
                )}
                <div className="easy-computer-board">
                    <Chessboard
                        position={game.fen()} // Set the board position from the game's current state
                        onPieceDrop={onDrop} // Handle piece drops
                        customDarkSquareStyle={{ backgroundColor: "#f39c12" }} // Custom styling for dark squares
                        customArrowColor="blue" // Custom color for arrows
                    />
                </div>
            </div>
        </>
    );
}

export default Computer;
