import React from 'react';

function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <h1>Spymaster</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
}

export default StartScreen; 