import React from 'react';
import '/src/assets/css/Home.css'; // Assuming Home.css will contain sidebar styles

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <h3>Fun Activities</h3>
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
  );
};

export default RightSidebar;