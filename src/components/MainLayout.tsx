import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './leftsidebar/LeftSidebar';
import RightSidebar from './rightsidebar/RightSidebar';
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