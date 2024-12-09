import React from 'react';

function Card({ word, color, onClick, revealed }) {
  return (
    <div 
      className={`card ${color || ''} ${revealed ? 'revealed' : ''}`}
      onClick={onClick}
    >
      {word}
    </div>
  );
}

export default Card; 