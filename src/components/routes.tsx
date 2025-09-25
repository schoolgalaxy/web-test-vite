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
      <Route path="/" element={<MainLayout><Explore /></MainLayout>} />
      <Route path="/explore" element={<MainLayout><Explore /></MainLayout>} />
      <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/test/:testId" element={<MainLayout><TestLayout /></MainLayout>} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/feedback" element={<FeedbackLayout />} />
      <Route path="/birds-quiz" element={<MainLayout><BirdQuizList /></MainLayout>} />
      <Route path="/birds-quiz/:quizId" element={<MainLayout><BirdQuizTest /></MainLayout>} />
      <Route path="/animals-quiz" element={<MainLayout><AnimalQuizList /></MainLayout>} />
      <Route path="/animals-quiz/:quizId" element={<MainLayout><AnimalQuizTest /></MainLayout>} />
    </Routes>
  );
};