import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useSubscription } from '../../hook/useSubscription';
import FreeProIndicator from '../know/FreeProIndicator';

interface Game {
  id: string;
  name: string;
  displayName: string;
  file: string;
  icon: string;
  description: string;
  play_type: string;
}

const games: Game[] = [
  {
    id: 'cosmic-memory',
    name: 'Cosmic Memory',
    displayName: 'Cosmic Memory',
    file: '/games/CosmicMemory.html',
    icon: '🧠',
    description: 'Test your memory with cosmic cards!',
    play_type: 'free'
  },
  {
    id: 'math-whiz-jr',
    name: 'Math Whiz Jr',
    displayName: 'Math Whiz Jr',
    file: '/games/MathWhizJr.html',
    icon: '🧮',
    description: 'Fun math challenges for young minds!',
    play_type: 'pro'
  },
  {
    id: 'solar-system',
    name: 'Solar System',
    displayName: 'Solar System Explorer',
    file: '/games/SolarSystem.html',
    icon: '🪐',
    description: 'Explore our solar system!',
    play_type: 'free'
  },
  {
    id: 'typing-titans',
    name: 'Typing Titans',
    displayName: 'Typing Titans',
    file: '/games/TypingTitans.html',
    icon: '⌨️',
    description: 'Improve your typing speed!',
    play_type: 'pro'
  },
  {
    id: 'word-wizards',
    name: 'Word Wizards',
    displayName: 'Word Wizards',
    file: '/games/WordWizards.html',
    icon: '🔤',
    description: 'Master vocabulary with magic!',
    play_type: 'pro'
  },
  {
    id: 'food-chain-match',
    name: 'Food Chain Match',
    displayName: 'Food Chain Match',
    file: '/games/FoodChainMatch.html',
    icon: '🍎',
    description: 'Learn about food chains and ecosystems!',
    play_type: 'pro'
  },
  {
    id: 'scribe',
    name: 'Scribe',
    displayName: 'Scribe',
    file: '/games/scribe.html',
    icon: '✍️',
    description: 'Practice writing and transcription skills!',
    play_type: 'pro'
  },
  {
    id: 'word-trail-trimmer',
    name: 'Word & Trail Trimmer',
    displayName: 'Word & Trail Trimmer',
    file: '/games/Word&TrailTrimmer.html',
    icon: '✂️',
    description: 'Trim and organize word trails!',
    play_type: 'pro'
  }
];

const GamesWidget: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { hasActiveSubscription } = useSubscription();

  const handleGameClick = (game: Game) => {
    if (game.play_type !== 'free' && !isLoggedIn && !hasActiveSubscription) {
      navigate('/upgrade');
    } else {
      navigate(`/games/${game.id}`);
    }
  };

  return (
    <div className="sidebar-widget">
      <div className="widget-header">
        <div className="widget-icon">🎯</div>
        <h4>Fun Activities</h4>
      </div>
      <div className="widget-content">
        <div className="games-grid">
          {games.map((game) => (
            <div
              key={game.id}
              className="game-item"
              onClick={() => handleGameClick(game)}
              style={{ cursor: 'pointer' }}
            >
              <span className="game-icon">{game.icon}</span>
              <div className="game-info">
                <span className="game-name">{game.displayName}</span>
                {/* <span className="game-description">{game.description}</span> */}
                { !isLoggedIn && !hasActiveSubscription && <FreeProIndicator playType={game.play_type} /> }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesWidget;