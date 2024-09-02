// computer.js
import './comp.css';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

function EasyComputer() {
    const [game, setGame] = useState(new Chess());
    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g }
            modify(update)
            return update;
        })
    }
    function makeRandomMove() {
        const possibleMove = game.moves();

        if (game.game_over() || game.in_draw() || possibleMove.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMove.length);
        safeGameMutate((game) => {
            game.move(possibleMove[randomIndex]);
        })
    }

    function onDrop(source, target) {
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: source,
                to: target,
                promotion: 'q'
            })
        })
        //illegal move 
        if (move == null) return false
        //valid move 
        setTimeout(makeRandomMove, 200);
        return true;
    }
    return (
        <div className="board">
            <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
                customArrowColor='blue'
            />
        </div>
    );
}

export default EasyComputer;