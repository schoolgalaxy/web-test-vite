import React from 'react';
import QuizList from '../quizzes/QuizList';

const AnimalQuizList: React.FC = () => {
  return (
    <QuizList
      quizCategory="animals"
      title="Animals Quiz Platform"
      description="Test your knowledge about various animals with our fun quizzes!"
      routePrefix="/animals-quiz"
    />
  );
};

export default AnimalQuizList;