import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { client } from '../App';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user ? (
          <li>
            <button onClick={signOut}>Sign out</button>
          </li>
        ) : (
          <li>
            <button onClick={() => client.auth.signInWithRedirect()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;