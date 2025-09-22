import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '../assets/css/Navbar.css';
import reactLogo from '../assets/react.svg';

const Navbar = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-brand">
          <img src={reactLogo} alt="Galaxy Logo" className="navbar-logo" />
          <Link to="/">Prep Galaxy</Link>
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