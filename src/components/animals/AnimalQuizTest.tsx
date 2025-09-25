import React from 'react';
import QuizTest from '../quizzes/QuizTest';

const AnimalQuizTest: React.FC = () => {
  return (
    <QuizTest
      quizCategory="animals"
      routePrefix="/animals-quiz"
    />
  );
};

export default AnimalQuizTest;