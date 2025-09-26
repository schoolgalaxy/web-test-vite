import { Route, Routes, useParams, Navigate } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import About from './About';
import TestLayout from './TestLayout';
import LoginScreen from './LoginScreen';
import FeedbackLayout from './feedback/FeedbackLayout';
import QuizList from './quizzes/QuizList';
import QuizTest from './quizzes/QuizTest';
import MainLayout from './MainLayout';
import quizzesConfig from '/src/assets/json_data/quizzes.json';

type QuizConfig = {
  id: string;
  name: string;
  description: string;
  routePrefix: string;
  category: string;
};

const QuizListRoute: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const cfg = (quizzesConfig as { quizzes: QuizConfig[] }).quizzes.find(q => q.category === category);
  if (!cfg) {
    return <Navigate to="/explore" replace />;
  }
  return (
    <QuizList
      quizCategory={cfg.category}
      title={cfg.name}
      description={cfg.description}
      routePrefix={cfg.routePrefix}
    />
  );
};

const QuizTestRoute: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const cfg = (quizzesConfig as { quizzes: QuizConfig[] }).quizzes.find(q => q.category === category);
  if (!cfg) {
    return <Navigate to="/explore" replace />;
  }
  return <QuizTest quizCategory={cfg.category} routePrefix={cfg.routePrefix} />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test/:testId" element={<TestLayout />} />
        <Route path="/quiz/:category" element={<QuizListRoute />} />
        <Route path="/quiz/:category/:quizId" element={<QuizTestRoute />} />
      </Route>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/feedback" element={<FeedbackLayout />} />
    </Routes>
  );
};