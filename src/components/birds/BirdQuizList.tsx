import React from 'react';
import QuizList from '../quizzes/QuizList';

const BirdQuizList: React.FC = () => {
  return (
    <QuizList
      quizCategory="birds"
      title="Birds Quiz Platform"
      description="Explore the world of birds with our engaging quizzes!"
      routePrefix="/birds-quiz"
    />
  );
};

export default BirdQuizList;