import React from 'react';
import QuizTest from '../quizzes/QuizTest';

const BirdQuizTest: React.FC = () => {
  return (
    <QuizTest
      quizCategory="birds"
      routePrefix="/birds-quiz"
    />
  );
};

export default BirdQuizTest;