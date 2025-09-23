import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import TestLayout from './components/TestLayout';
import LoginScreen from './components/LoginScreen';
import FeedbackForm from './components/FeedbackForm';
function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: '2px' }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/test/:testId" element={<TestLayout />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/feedback" element={<FeedbackForm />} />
            </Routes>
          </div>
        </main>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
