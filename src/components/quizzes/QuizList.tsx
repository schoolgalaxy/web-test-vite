import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import '../../assets/css/McqList.css'; // Reusing MCQ list styles
import birdImg from '/src/assets/img/bird.svg';
import animalImg from '/src/assets/img/animal.svg';
import aquaticImg from '/src/assets/img/aquatic.svg';
import placeholderImg from '/src/assets/img/quiz-placeholder.svg';
import quizzesConfig from '../../assets/data/quizzes.json';
import debug from '../../util/debug';
import { loadQuizDataByCategory, extractQuizMetadata } from '../../util/assetsLoader';
import FreeProIndicator from '../know/FreeProIndicator';

interface QuizMetaData {
  id: string;
  name: string;
  description: string;
  profilePic: string;
  play_type?: string;
}

type QuizConfig = {
  id: string;
  name: string;
  description: string;
  routePrefix: string;
  category: string;
  active: boolean;
  priority: number;
};

const QuizList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const cfg = (quizzesConfig as { quizzes: QuizConfig[] }).quizzes.find(q => q.category === category);

  // If category not found or not active, redirect to explore
  if (!cfg || !cfg.active) {
    return <Navigate to="/explore" replace />;
  }

  const { category: quizCategory, name: title, description, routePrefix } = cfg;
  const [quizzes, setQuizzes] = useState<QuizMetaData[]>([]);

  useEffect(() => {
    const fetchQuizMetaData = async () => {
      try {
        // Use the new asset loader with proper error handling
        const quizData = loadQuizDataByCategory(quizCategory);
        const allMetaData = extractQuizMetadata(quizData);
        setQuizzes(allMetaData);
      } catch (error) {
        debug.error(`Error fetching quiz metadata for ${quizCategory}:`, error);
        // Set empty array to prevent rendering errors
        setQuizzes([]);
      }
    };

    fetchQuizMetaData();
  }, [quizCategory]);

  const handleQuizClick = (quiz: QuizMetaData) => {
    if (quiz.play_type !== 'free') {
      navigate('/upgrade');
    } else {
      navigate(`${routePrefix}/${quiz.id}`);
    }
  };

  return (
    <div className="mcq-list-container">
      <h2 className="mcq-list-title">{title}</h2>
      <p>{description}</p>
      <div className="mcq-tiles-grid">
        {quizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className="mcq-tile-link"
            onClick={() => handleQuizClick(quiz)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`mcq-tile ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
              <FreeProIndicator playType={quiz.play_type} />
              <img
                src={quiz.profilePic || (quizCategory === 'birds' ? birdImg : quizCategory === 'animals' ? animalImg : quizCategory === 'aquatic' ? aquaticImg : placeholderImg)}
                alt={quiz.name}
                className={`mcq-tile-profile-pic ${index % 2 === 0 ? 'left' : 'right'}`}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = quizCategory === 'birds' ? birdImg : quizCategory === 'animals' ? animalImg : quizCategory === 'aquatic' ? aquaticImg : placeholderImg;
                }}
              />
              <h3 className="mcq-tile-name">{quiz.name}</h3>
              <p className="mcq-tile-description">{quiz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;