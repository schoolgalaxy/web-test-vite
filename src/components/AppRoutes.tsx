import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load components for better code splitting
const Home = lazy(() => import('./Home'));
const Explore = lazy(() => import('./Explore'));
const TestLayout = lazy(() => import('./TestLayout'));
const LoginPromo = lazy(() => import('./login/LoginPromo'));
const SignoutScreen = lazy(() => import('./login/SignoutScreen'));
const FeedbackLayout = lazy(() => import('./feedback/FeedbackLayout'));
const QuizList = lazy(() => import('./quizzes/QuizList'));
const QuizRoute = lazy(() => import('./quizzes/QuizRoute'));
const MainLayout = lazy(() => import('./MainLayout'));
const About = lazy(() => import('./about/AboutUs'));
const NavbarCustomizer = lazy(() => import('./navbar/NavbarCustomizer'));
const KnowMenu = lazy(() => import('./know/KnowMenu'));
const KnowWidget = lazy(() => import('./know/KnowWidget'));
const KnowCategoryContent = lazy(() => import('./know/KnowCategoryContent'));
const KnowPresentation = lazy(() => import('./know/KnowPresentation'));
const Games = lazy(() => import('./games/Games.tsx'));
const Upgrade = lazy(() => import('./user/Upgrade'));

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
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/navbar-customizer" element={<NavbarCustomizer />} />
          <Route path="/know" element={<KnowMenu />} />
          <Route path="/know-widget" element={<KnowWidget />} />
          <Route path="/know/:category" element={<KnowCategoryContent />} />
          <Route path="/know/:category/:uniqueId" element={<KnowPresentation />} />
          <Route path="/test/:testId" element={<TestLayout />} />
          <Route path="/quiz/:category" element={<QuizList />} />
          <Route path="/quiz/:category/:quizId" element={<QuizRoute />} />
          <Route path="/games/:gameId" element={<Games />} />
        </Route>
        <Route path="/login" element={<LoginPromo />} />
        <Route path="/signout" element={<SignoutScreen />} />
        <Route path="/feedback" element={<FeedbackLayout />} />
      </Routes>
    </Suspense>
  );
};