import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '/src/assets/css/Home.css'; // Assuming Home.css will contain sidebar styles
import iconFeedback from '/src/assets/img/icon-feedback.svg';
import iconAbout from '/src/assets/img/icon-about.svg';


// Define types for the widget data
interface Quiz {
  id: string;
  name: string;
  displayName: string;
  description: string;
  route: string;
  routePrefix: string;
  category: string;
  icon: string;
  realIcon?: string;
  iconAlt: string;
  active: boolean;
  priority: number;
}

interface WidgetData {
  title?: string;
  name?: string;
  quizzes: Quiz[];
}

// Import widget loading utilities
import { loadWidgetsData } from '../../util/widgetLoader';

const LeftSidebar: React.FC = () => {
  const { user } = useAuthenticator();

  // Load widgets data
  const widgetsData = loadWidgetsData();

  return (
    <div className="left-sidebar">
      {/* Render widgets with their headers */}
      {widgetsData.map((widget: WidgetData) => (
        <div key={widget.title || widget.name} className="widget">
          <div className="widget-header">
            {widget.title || widget.name}
          </div>
          <ul className="widget-list">
            {widget.quizzes
              .filter((quiz: Quiz) => quiz.active)
              .sort((a: Quiz, b: Quiz) => a.priority - b.priority)
              .map((quiz: Quiz) => (
              <li key={quiz.id}>
                <Link to={quiz.route}>
                  <span className="explore-icon">{quiz.realIcon || '📚'}</span>
                  {/* <Image
                    src={quiz.icon || quiz.realIcon}
                    alt={quiz.iconAlt}
                    className="sidebar-icon"
                    onError={(e) => {
                      debug.log('Rendering LeftSidebar quiz.icon', e);
                      const target = e.target as HTMLImageElement;
                      if (target.src !== iconHome) {
                        target.src = iconHome;
                      }
                    }}
                  /> */}
                  {quiz.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

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
    </div>
  );
};

export default LeftSidebar;