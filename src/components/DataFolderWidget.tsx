import React from 'react';
import '../assets/css/Home.css';

const DataFolderWidget = () => {
  // Data folders from the assets/data directory
  const dataFolders = [
    { name: 'AI', path: 'ai', icon: '🤖' },
    { name: 'Animals', path: 'animals', icon: '🐾' },
    { name: 'Aquatic Life', path: 'aquatic', icon: '🐠' },
    { name: 'Birds', path: 'birds', icon: '🐦' },
    { name: 'Computer Science', path: 'computer_science', icon: '💻' },
    { name: 'Insects', path: 'insects', icon: '🦋' },
    { name: 'Space', path: 'space', icon: '🚀' },
    { name: 'Sports', path: 'sports', icon: '⚽' }
  ];

  return (
    <div className="data-folder-widget">
      <h2>Explore Learning Categories</h2>
      <p className="widget-description">
        Discover our comprehensive collection of quizzes and learning materials organized by category.
      </p>

      <div className="folder-grid">
        {dataFolders.map((folder, index) => (
          <div key={index} className="folder-item">
            <div className="folder-icon">{folder.icon}</div>
            <h3>{folder.name}</h3>
            <p>Interactive quizzes and educational content</p>
          </div>
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