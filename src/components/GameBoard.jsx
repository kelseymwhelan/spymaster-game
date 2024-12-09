import React, { useState } from 'react';
import Card from './Card.jsx';

function GameBoard({ 
  words, 
  startingTeam, 
  colorAssignments, 
  onEndGame, 
  revealedCards, 
  onCardClick,
  isGameOver
}) {
  const [currentView, setCurrentView] = useState('players');

  return (
    <div className={`game-board ${startingTeam}-border`}>
      <div className="controls">
        <div className="tabs">
          <button 
            className={currentView === 'players' ? 'active' : ''} 
            onClick={() => setCurrentView('players')}
          >
            Player View
          </button>
          <button 
            className={currentView === 'spymasters' ? 'active' : ''} 
            onClick={() => setCurrentView('spymasters')}
          >
            Spymaster View
          </button>
        </div>
        <button className="end-game" onClick={onEndGame}>End Game</button>
      </div>
      
      <div className="grid">
        {words.map((word, index) => (
          <Card
            key={index}
            word={word}
            color={currentView === 'spymasters' || revealedCards.has(index) 
              ? colorAssignments[index] 
              : null}
            onClick={() => !isGameOver && currentView === 'players' && onCardClick(index)}
            revealed={revealedCards.has(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard; 