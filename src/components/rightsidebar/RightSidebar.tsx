import React from 'react';
import { Link } from 'react-router-dom';
import quizzesConfig from '../../assets/data/quizzes.json';
import knowConfig from '../../assets/know/know.json';
import '/src/assets/css/Home.css'; // Assuming Home.css will contain sidebar styles

const RightSidebar: React.FC = () => {
  // Get active quiz categories from config
  const activeQuizzes = (quizzesConfig as { quizzes: any[] }).quizzes.filter(quiz => quiz.active);
  const exploreCategories = activeQuizzes.slice(0, 6); // Show first 6 categories

  // Get active know categories from config
  const activeKnowCategories = (knowConfig as { categories: any[] }).categories.filter(category => category.active);
  const knowCategories = activeKnowCategories.slice(0, 4); // Show first 4 categories

  return (
    <div className="right-sidebar">
      {/* Explore Widget */}
      <div className="sidebar-widget">
        <div className="widget-header">
          <div className="widget-icon">🧭</div>
          <h4>Explore</h4>
        </div>
        <div className="widget-content">
          <div className="explore-grid">
            {exploreCategories.map((quiz, index) => (
              <Link key={index} to={`/quiz/${quiz.category}`} className="explore-item">
                <span className="explore-icon">{quiz.realIcon || '📚'}</span>
                <span className="explore-name">{quiz.displayName || quiz.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Know About Widget */}
      <div className="sidebar-widget">
        <div className="widget-header">
          <div className="widget-icon">📖</div>
          <h4>Know About</h4>
        </div>
        <div className="widget-content">
          <div className="know-grid">
            {knowCategories.map((category, index) => (
              <Link key={index} to={`/know/${category.category}`} className="know-item">
                <span className="know-icon">{category.realIcon || '📚'}</span>
                <span className="know-name">{category.displayName || category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Activities Section */}
      <div className="sidebar-widget">
        <div className="widget-header">
          <div className="widget-icon">🎯</div>
          <h4>Fun Activities</h4>
        </div>
        <div className="widget-content">
          <div className="ad-content">
            <p>Learn about animals with interactive quizzes!</p>
            <img
              src="/icons/paw.svg"
              alt="Animal quizzes"
              style={{ width: '64px', height: '64px' }}
            />
          </div>
          <div className="ad-content">
            <p>Improve your math skills with engaging games!</p>
            <img
              src="/icons/pi.svg"
              alt="Math games"
              style={{ width: '64px', height: '64px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;