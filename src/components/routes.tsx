import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import About from './About';
import TestLayout from './TestLayout';
import LoginScreen from './LoginScreen';
import FeedbackLayout from './feedback/FeedbackLayout';
import QuizList from './quizzes/QuizList';
import QuizRoute from './quizzes/QuizRoute';
import MainLayout from './MainLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test/:testId" element={<TestLayout />} />
        <Route path="/quiz/:category" element={<QuizList />} />
        <Route path="/quiz/:category/:quizId" element={<QuizRoute />} />
      </Route>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/feedback" element={<FeedbackLayout />} />
    </Routes>
  );
};