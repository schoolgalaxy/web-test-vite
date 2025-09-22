import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import TestLayout from './components/TestLayout';
import LoginScreen from './components/LoginScreen';

export const client = generateClient<Schema>();

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: '72px' }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/test/:testId" element={<TestLayout />} />
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
          </div>
        </main>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
