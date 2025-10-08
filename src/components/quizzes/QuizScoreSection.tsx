import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

interface QuizScoreSectionProps {
  title: string;
  score: number;
  totalQuestions: number;
  routePrefix: string;
  onRetake: () => void;
}

const QuizScoreSection: React.FC<QuizScoreSectionProps> = ({
  title,
  score,
  totalQuestions,
  routePrefix,
  onRetake
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleSignIn = () => {
    navigate('/login-promo');
  };

  return (
    <div className="score-section">
      <h2>Congratulations! You've completed the {title} quiz.</h2>
      <p>You scored {score} out of {totalQuestions}</p>

      {isLoggedIn ? (
        <div>
          <button onClick={onRetake} className="simple-button">
            Retake Quiz
          </button>
          <button onClick={() => navigate(routePrefix)} className="simple-button">
            Take Another Quiz
          </button>
        </div>
      ) : (
        <div>
          <p>Please sign in to track your progress.</p>
          <button onClick={handleSignIn} className="simple-button" style={{ marginBottom: '20px' }} >
            Sign In
          </button>
          <br/>
          <button onClick={onRetake} className="simple-button">
            Retake Quiz
          </button>
          <button onClick={() => navigate(routePrefix)} className="simple-button">
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScoreSection;