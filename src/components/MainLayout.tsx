import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import '../assets/css/Home.css'; // Assuming Home.css has the layout styles

const MainLayout: React.FC = () => {
  return (
    <div className="home-layout">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default MainLayout;