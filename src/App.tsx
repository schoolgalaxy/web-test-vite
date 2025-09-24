import { BrowserRouter as Router } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from './components/Navbar';
import { AppRoutes } from './components/routes';

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: '2px' }}>
          <div className="container">
            <AppRoutes />
          </div>
        </main>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
