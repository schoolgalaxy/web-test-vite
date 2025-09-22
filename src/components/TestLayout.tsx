import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import McqTest from './mcq/McqTest';
import '../assets/css/Home.css'; // Import the new Home CSS

const TestLayout: React.FC = () => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      <McqTest />
      <RightSidebar />
    </div>
  );
};

export default TestLayout;