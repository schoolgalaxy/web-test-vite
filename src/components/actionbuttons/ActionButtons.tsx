import React, { useState } from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
  className?: string;
  onFav?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  className = '',
  onFav,
  onLike,
  onDislike,
  onComment
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [faved, setFaved] = useState(false);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
    onLike?.();
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
    onDislike?.();
  };

  const handleFav = () => {
    setFaved(!faved);
    onFav?.();
  };

  const handleComment = () => {
    onComment?.();
  };

  return (
    <div className={`action-buttons ${className}`}>
      <button
        className={`action-btn fav-btn ${faved ? 'active' : ''}`}
        onClick={handleFav}
        title="Add to Favorites"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <button
        className={`action-btn like-btn ${liked ? 'active' : ''}`}
        onClick={handleLike}
        title="Like"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      </button>

      <button
        className={`action-btn dislike-btn ${disliked ? 'active' : ''}`}
        onClick={handleDislike}
        title="Dislike"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zm10-2h3a2 2 0 0 0 2 2v7a2 2 0 0 0-2 2h-3"/>
        </svg>
      </button>

      <button
        className="action-btn comment-btn"
        onClick={handleComment}
        title="Add Comment"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    </div>
  );
};

export default ActionButtons;