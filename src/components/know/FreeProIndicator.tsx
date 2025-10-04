import './FreeProIndicator.css';

interface FreeProIndicatorProps {
  playType?: string;
  className?: string;
}

const FreeProIndicator = ({ playType = 'pro', className = '' }: FreeProIndicatorProps) => {
  if (playType === 'free') {
    return (
      <div className={`free-icon ${className}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>FREE</span>
      </div>
    );
  }

  return (
    <button className={`upgrade-button ${className}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
      Pro
    </button>
  );
};

export default FreeProIndicator;