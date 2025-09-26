import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '/src/assets/css/Home.css'; // Assuming Home.css will contain sidebar styles
import iconHome from '/src/assets/img/icon-home.svg';
import iconBirds from '/src/assets/img/icon-birds.svg';
import iconAnimals from '/src/assets/img/icon-animals.svg';
import iconAquatic from '/src/assets/img/icon-aquatic.svg';
import iconFeedback from '/src/assets/img/icon-feedback.svg';
import iconAbout from '/src/assets/img/icon-about.svg';

const LeftSidebar: React.FC = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="left-sidebar">
      <div className="widget">
        <div className="widget-header">Categories</div>
        <ul className="widget-list">
          <li>
            <Link to="/home">
              <img src={iconHome} alt="Home" className="sidebar-icon" />
              Home
            </Link>
          </li>
          {/* <li><Link to="/class-1-5">Class 1-5</Link></li>
          <li><Link to="/class-5-9">Class 5-9</Link></li> */}
          <li>
            <Link to="/quiz/birds">
              <img src={iconBirds} alt="Birds" className="sidebar-icon" />
              Birds Quiz
            </Link>
          </li>
          <li>
            <Link to="/quiz/animals">
              <img src={iconAnimals} alt="Animals" className="sidebar-icon" />
              Animals Quiz
            </Link>
          </li>
          <li>
            <Link to="/quiz/aquatic">
              <img src={iconAquatic} alt="Aquatic" className="sidebar-icon" />
              Aquatic Quiz
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="widget">
        {/* <div className="widget-header">Follow Us</div> */}
        <ul className="widget-list">
          <li>
            <Link to="/feedback">
              <img src={iconFeedback} alt="Feedback" className="sidebar-icon" />
              Feedback
            </Link>
          </li>
          <li>
            <Link to="/about">
              <img src={iconAbout} alt="About" className="sidebar-icon" />
              About Us
            </Link>
          </li>
        </ul>
      </div>

      {!user && (
        <div className="widget">
          <ul className="widget-list">
            <li>
              <Link to="/login" className="login-link">
                <button className="login-button">
                  Sign In
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;