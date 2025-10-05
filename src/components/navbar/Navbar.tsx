import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useTheme } from '../../util/ThemeContext';
import NavbarCustomizerModal from './NavbarCustomizerModal';
import SearchComponent from './SearchComponent';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuthenticator();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="navbar-brand">
            <img src="/icons/galaxy.png" alt="Prep Galaxy" className="navbar-logo" />
            WonderScope
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/know-widget">Know More</Link>
          </li>
          <li className="navbar-search">
            <SearchComponent />
          </li>
          <li className="navbar-auth">
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <button
              onClick={() => setShowCustomizer(true)}
              title="Navbar Settings"
              style={{
                fontSize: '1.2rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'background-color 0.2s ease'
              }}
            >
              ⚙️
            </button>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          {user ? (
            <li>
              <button onClick={() => navigate('/signout')}>Sign out</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
      <NavbarCustomizerModal
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
    </>
  );
};

export default Navbar;