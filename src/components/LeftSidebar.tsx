import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Home.css'; // Assuming Home.css will contain sidebar styles

const LeftSidebar: React.FC = () => {
  return (
    <div className="left-sidebar">
      <h4>Categories</h4>
      <ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/class-1-5">Class 1-5</Link></li>
          <li><Link to="/class-5-9">Class 5-9</Link></li> */}
          <li><Link to="/feedback">feedback</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </ul>
    </div>
  );
};

export default LeftSidebar;