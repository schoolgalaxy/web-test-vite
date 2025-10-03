import { BrowserRouter as Router } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from './components/navbar/Navbar';
import { AppRoutes } from './components/AppRoutes';
import { ThemeProvider } from './util/ThemeContext';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
