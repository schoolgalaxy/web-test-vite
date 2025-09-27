import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load components for better code splitting
const Home = lazy(() => import('./Home'));
const Explore = lazy(() => import('./Explore'));
const About = lazy(() => import('./About'));
const TestLayout = lazy(() => import('./TestLayout'));
const LoginScreen = lazy(() => import('./LoginScreen'));
const FeedbackLayout = lazy(() => import('./feedback/FeedbackLayout'));
const QuizList = lazy(() => import('./quizzes/QuizList'));
const QuizRoute = lazy(() => import('./quizzes/QuizRoute'));
const MainLayout = lazy(() => import('./MainLayout'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
};