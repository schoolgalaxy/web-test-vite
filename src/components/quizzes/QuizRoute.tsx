import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import QuizTest from './QuizTest';
import McqHintTest from './McqHintTest';
import quizzesConfig from '../../assets/json_data/quizzes.json';
import debug from '../../util/debug';

type QuizConfig = {
  id: string;
  name: string;
  description: string;
  routePrefix: string;
  category: string;
};

const QuizRoute: React.FC = () => {
  const { category, quizId } = useParams<{ category: string; quizId: string }>();
  debug.log('QuizRoute rendered with:', { category, quizId });
  const cfg = (quizzesConfig as { quizzes: QuizConfig[] }).quizzes.find(q => q.category === category);
  const [quizType, setQuizType] = useState<string | null>(null);

  useEffect(() => {
    const checkQuizType = async () => {
      if (quizId && category) {
        try {
          const modules = import.meta.glob('/src/assets/json_data/**/*.json', { eager: true });
          const targetPathSuffix = `/${category}/${quizId}.json`;
          debug.log('Looking for quiz:', category, quizId);
          debug.log('Target path suffix:', targetPathSuffix);

          const matchKey = Object.keys(modules).find((key) => key.endsWith(targetPathSuffix));
          debug.log('Available paths:', Object.keys(modules).filter(k => k.includes(category)));
          debug.log('Match key found:', matchKey);

          if (matchKey) {
            const module: any = modules[matchKey as keyof typeof modules];
            const data = module.default ?? module;
            debug.log('Quiz data type:', data.type);
            setQuizType(data.type);
          } else {
            debug.log('No match found for:', targetPathSuffix);
          }
        } catch (error) {
          debug.error('Error checking quiz type:', error);
        }
      }
    };

    checkQuizType();
  }, [category, quizId]);

  if (!cfg) {
    return <Navigate to="/explore" replace />;
  }

  // Show loading while checking quiz type
  if (quizType === null) {
    return <div>Loading quiz...</div>;
  }

  // Use McqHintTest for MCQ_10_Hint quizzes, QuizTest for others
  return quizType === 'MCQ_10_Hint' ? (
    <McqHintTest quizCategory={cfg.category} routePrefix={cfg.routePrefix} />
  ) : (
    <QuizTest quizCategory={cfg.category} routePrefix={cfg.routePrefix} />
  );
};

export default QuizRoute;