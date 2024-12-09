import React from 'react';

function GameOver({ onEndGame }) {
  return (
    <div className="game-over-overlay">
      <h1>You Lose!</h1>
      <button onClick={onEndGame}>End Game</button>
    </div>
  );
}

export default GameOver; 