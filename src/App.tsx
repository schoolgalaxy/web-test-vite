import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from './components/navbar/Navbar';
import { AppRoutes } from './components/AppRoutes';
import { ThemeProvider } from './util/ThemeContext';
import LoginPromo from './components/login/LoginPromo';

function AppContent() {
  const location = useLocation();

  // Show only LoginPromo for /login-promo route without navbar
  if (location.pathname === '/login' || location.pathname === '/login-promo') {
    return <LoginPromo />;
  }

  // Show normal app layout with navbar for all other routes
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '2px' }}>
        <div className="container">
          <AppRoutes />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Authenticator.Provider>
        <Router>
          <AppContent />
        </Router>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

export default App;
