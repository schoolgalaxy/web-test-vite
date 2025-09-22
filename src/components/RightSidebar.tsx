import React from 'react';
import '../assets/css/Home.css'; // Assuming Home.css will contain sidebar styles

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <h3>Fun Activities</h3>
        <div className="ad-content">
          <p>Learn about animals with interactive quizzes!</p>
          <img src="/src/assets/react.svg" alt="Animal Quiz Ad" />
        </div>
        <div className="ad-content">
          <p>Improve your math skills with engaging games!</p>
          <img src="/src/assets/vite.svg" alt="Math Games Ad" />
        </div>
    </div>
  );
};

export default RightSidebar;