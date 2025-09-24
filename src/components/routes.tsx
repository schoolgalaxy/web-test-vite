import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import About from './About';
import TestLayout from './TestLayout';
import LoginScreen from './LoginScreen';
import FeedbackForm from './FeedbackForm';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/test/:testId" element={<TestLayout />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/feedback" element={<FeedbackForm />} />
    </Routes>
  );
};