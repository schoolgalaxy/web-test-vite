import React from 'react';
import { useParams } from 'react-router-dom';

interface Game {
  id: string;
  name: string;
  displayName: string;
  file: string;
  icon: string;
  description: string;
}

const games: Game[] = [
  {
    id: 'cosmic-memory',
    name: 'Cosmic Memory',
    displayName: 'Cosmic Memory',
    file: '/games/CosmicMemory.html',
    icon: '🧠',
    description: 'Test your memory with cosmic cards!'
  },
  {
    id: 'math-whiz-jr',
    name: 'Math Whiz Jr',
    displayName: 'Math Whiz Jr',
    file: '/games/MathWhizJr.html',
    icon: '🧮',
    description: 'Fun math challenges for young minds!'
  },
  {
    id: 'solar-system',
    name: 'Solar System',
    displayName: 'Solar System Explorer',
    file: '/games/SolarSystem.html',
    icon: '🪐',
    description: 'Explore our solar system!'
  },
  {
    id: 'typing-titans',
    name: 'Typing Titans',
    displayName: 'Typing Titans',
    file: '/games/TypingTitans.html',
    icon: '⌨️',
    description: 'Improve your typing speed!'
  },
  {
    id: 'word-wizards',
    name: 'Word Wizards',
    displayName: 'Word Wizards',
    file: '/games/WordWizards.html',
    icon: '🔤',
    description: 'Master vocabulary with magic!'
  }
];

const Games: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const game = games.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="games-container">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Not Found</h2>
          <p>The requested game could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="games-container">
      <div className="game-header">
        {/* <h2 className="text-2xl font-bold mb-2">{game.displayName}</h2> */}
        <p className="text-gray-600 mb-4">{game.description}</p>
      </div>
      <div className="game-iframe-container">
        <iframe
          src={game.file}
          title={game.name}
          className="game-iframe"
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Games;