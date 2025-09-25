import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import '../assets/css/Home.css'; // Assuming Home.css has the layout styles

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      {children}
      <RightSidebar />
    </div>
  );
};

export default MainLayout;