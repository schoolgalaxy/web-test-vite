import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import About from './About';
import TestLayout from './TestLayout';
import LoginScreen from './LoginScreen';
import FeedbackLayout from './feedback/FeedbackLayout';
import BirdQuizList from './birds/BirdQuizList';
import BirdQuizTest from './birds/BirdQuizTest';
import AnimalQuizList from './animals/AnimalQuizList';
import AnimalQuizTest from './animals/AnimalQuizTest';
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
        <Route path="/birds-quiz" element={<BirdQuizList />} />
        <Route path="/birds-quiz/:quizId" element={<BirdQuizTest />} />
        <Route path="/animals-quiz" element={<AnimalQuizList />} />
        <Route path="/animals-quiz/:quizId" element={<AnimalQuizTest />} />
      </Route>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/feedback" element={<FeedbackLayout />} />
    </Routes>
  );
};