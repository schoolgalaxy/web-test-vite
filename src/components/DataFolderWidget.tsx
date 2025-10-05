import '../assets/css/Home.css';
import { Link } from 'react-router-dom';
import quizzesConfig from '../assets/data/quizzes.json';

const DataFolderWidget = () => {
  // Get active quiz categories from config
  const activeQuizzes = (quizzesConfig as { quizzes: any[] }).quizzes.filter(quiz => quiz.active);

  // Map active categories to display format
  const dataFolders = activeQuizzes.map(quiz => ({
    name: quiz.displayName || quiz.name,
    description: quiz.description || 'Explore this category with engaging quizzes and learning modules.',
    path: quiz.category,
    icon: quiz.realIcon || '📚', // Default icon since we have individual icons in config
    route: quiz.route
  }));

  return (
    <div className="data-folder-widget">
      <h2>Explore Your Universe</h2>
      <p className="widget-description">
        Select a Discovery Set to begin your adventure!
      </p>

      <div className="folder-grid">
        {dataFolders.map((folder, index) => (
          <Link key={index} to={`/quiz/${folder.path}`} className="folder-item-link">
            <div className="folder-item">
              <div className="folder-icon">{folder.icon}</div>
              <h3>{folder.name}</h3>
              <p>{folder.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="widget-footer">
        <p>Total Categories: {dataFolders.length}</p>
        <p>Each category contains multiple quizzes and learning modules</p>
      </div>
    </div>
  );
};

export default DataFolderWidget;