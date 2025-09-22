import React from 'react';
import McqList from './mcq/McqList';
import Banner from './Banner';
import '../assets/css/Home.css'; // Assuming Home.css will contain styles for center section

const CenterSection: React.FC = () => {
  return (
    <div className="middle-pane">
      {/* <div className="hero-section">
        <h1>Welcome to the MCQ Test Platform</h1>
        <p>Test your knowledge with our diverse range of multiple-choice quizzes.</p>
      </div> */}
      <div className="mcq-list-section">
        <McqList />
      </div>
      <Banner />
    </div>
  );
};

export default CenterSection;