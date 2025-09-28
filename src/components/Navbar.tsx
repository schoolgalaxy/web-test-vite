import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useTheme } from '../util/ThemeContext';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuthenticator();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-brand">
          <img src="/icons/galaxy.png" alt="Prep Galaxy" className="navbar-logo" />
          Prep Galaxy
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/know">Know About</Link>
        </li>
        <li className="navbar-auth">
          <Link to="/about-us">About</Link>
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
            <button onClick={signOut}>Sign out</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;