import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [startingTeam, setStartingTeam] = useState(null);
  const [colorAssignments, setColorAssignments] = useState({});
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);

  const startGame = async () => {
    try {
      const response = await fetch('/wordlist-eng.txt');
      const text = await response.text();
      const wordList = text.split('\n').filter(word => word.trim());
      const selectedWords = getRandomWords(wordList, 25);
      const startTeam = Math.random() < 0.5 ? 'red' : 'blue';
      const colors = assignColors(startTeam);
      
      setWords(selectedWords);
      setStartingTeam(startTeam);
      setColorAssignments(colors);
      setRevealedCards(new Set());
      setIsGameOver(false);
      setGameStarted(true);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setWords([]);
    setStartingTeam(null);
    setColorAssignments({});
    setRevealedCards(new Set());
    setIsGameOver(false);
  };

  const handleCardClick = (index) => {
    if (colorAssignments[index] === 'black') {
      setIsGameOver(true);
    }
    setRevealedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <GameBoard 
            words={words}
            startingTeam={startingTeam}
            colorAssignments={colorAssignments}
            onEndGame={endGame}
            revealedCards={revealedCards}
            onCardClick={handleCardClick}
            isGameOver={isGameOver}
          />
          {isGameOver && <GameOver onEndGame={endGame} />}
        </>
      )}
    </div>
  );
}

function getRandomWords(wordList, count) {
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function assignColors(startingTeam) {
  const positions = Array.from({ length: 25 }, (_, i) => i);
  const shuffled = positions.sort(() => 0.5 - Math.random());
  const assignments = {};

  const startColor = startingTeam;
  const otherColor = startingTeam === 'red' ? 'blue' : 'red';

  // Assign starting team color (9 cards)
  shuffled.slice(0, 9).forEach(pos => assignments[pos] = startColor);
  
  // Assign other team color (8 cards)
  shuffled.slice(9, 17).forEach(pos => assignments[pos] = otherColor);
  
  // Assign neutral color (7 cards)
  shuffled.slice(17, 24).forEach(pos => assignments[pos] = 'beige');
  
  // Assign black card (1 card)
  assignments[shuffled[24]] = 'black';

  return assignments;
}

export default App;
