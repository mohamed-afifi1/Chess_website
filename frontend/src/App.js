import React, { useState }from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import './App.css';



function App() {
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
    <nav>
        <ul>
            <li><a href="https://github.com/jhlywa/chess.js">Home</a></li>
            <li><a href="https://github.com/jhlywa/chess.js">Login</a></li>
            <li><a href="https://github.com/jhlywa/chess.js">Register</a></li>
        </ul>
    </nav>
    <div className="app">
      <Chessboard position={game.fen()}
       onPieceDrop={ drop }
       customDarkSquareStyle={{ backgroundColor: "#f39c12" }}
       arePremovesAllowed={ true }
       />
    </div>
    </>
  );
}

export default App;