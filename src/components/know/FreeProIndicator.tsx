import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useSubscription } from '../../hook/useSubscription';
import './FreeProIndicator.css';

interface FreeProIndicatorProps {
  playType?: string;
  className?: string;
}

const FreeProIndicator = ({ playType = 'pro', className = '' }: FreeProIndicatorProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  
  const handleUpgradeClick = () => {
    navigate('/upgrade');
  };

  if (playType === 'free') {
    return (
      <div className={`free-icon ${className}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        {/* <span>Free</span> */}
      </div>
    );
  }

  // If user is logged in, show unlocked state for pro features
  if (isLoggedIn && playType !== 'pro-upgrade') {
    return (
      <div className={`pro-unlocked-icon ${className}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Pro</span>
      </div>
    );
  }

  if (playType === 'pro-upgrade' && hasActiveSubscription) {
    return (
      <div className={`pro-unlocked-icon ${className}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    );
  }

  return (
    <button className={`upgrade-button ${className}`} onClick={handleUpgradeClick}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM16 10v10H8V10h8z"/>
      </svg>
    </button>
  );
};

export default FreeProIndicator;