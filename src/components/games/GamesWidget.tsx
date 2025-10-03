import React from 'react';
import { Link } from 'react-router-dom';

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
  },
  {
    id: 'food-chain-match',
    name: 'Food Chain Match',
    displayName: 'Food Chain Match',
    file: '/games/FoodChainMatch.html',
    icon: '🍎',
    description: 'Learn about food chains and ecosystems!'
  },
  {
    id: 'scribe',
    name: 'Scribe',
    displayName: 'Scribe',
    file: '/games/scribe.html',
    icon: '✍️',
    description: 'Practice writing and transcription skills!'
  },
  {
    id: 'word-trail-trimmer',
    name: 'Word & Trail Trimmer',
    displayName: 'Word & Trail Trimmer',
    file: '/games/Word&TrailTrimmer.html',
    icon: '✂️',
    description: 'Trim and organize word trails!'
  }
];

const GamesWidget: React.FC = () => {
  return (
    <div className="sidebar-widget">
      <div className="widget-header">
        <div className="widget-icon">🎯</div>
        <h4>Fun Activities</h4>
      </div>
      <div className="widget-content">
        <div className="games-grid">
          {games.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`} className="game-item">
              <span className="game-icon">{game.icon}</span>
              <div className="game-info">
                <span className="game-name">{game.displayName}</span>
                {/* <span className="game-description">{game.description}</span> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesWidget;