import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-brand">
          <Link to="/explore">
            <img src="/icons/galaxy.svg" alt="Prep Galaxy" className="navbar-logo" />
            Prep Galaxy
          </Link>
        </li>
        <li>
          <Link to="/">Explore</Link>
        </li>
        <li className="navbar-auth">
          <Link to="/about">About</Link>
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