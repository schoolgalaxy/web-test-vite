import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-brand">
          <img src="/src/assets/react.svg" alt="Prep Platform Logo" className="navbar-logo" />
          <Link to="/">Prep Platform</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li className="navbar-auth">
            <button onClick={signOut}>Sign out</button>
          </li>
        ) : (
          <li className="navbar-auth">
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;