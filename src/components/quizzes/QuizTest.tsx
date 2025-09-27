import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/McqTest.css'; // Reusing MCQ test styles
import debug from '../../util/debug';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizData {
  title: string;
  description: string;
  profilePic: string;
  questions: Question[];
}

interface QuizTestProps {
  quizCategory: string; // e.g., 'birds', 'animals'
  routePrefix: string; // e.g., '/birds-quiz', '/animals-quiz'
}

const QuizTest: React.FC<QuizTestProps> = ({ quizCategory, routePrefix }) => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const loadQuizData = () => {
      try {
        const modules = import.meta.glob('/src/assets/data/**/*.json', { eager: true });
        const targetPathSuffix = `/${quizCategory}/${quizId}.json`;
        const matchKey = Object.keys(modules).find((key) => key.endsWith(targetPathSuffix));

        if (!matchKey) {
          throw new Error(`Quiz data not found for ${quizCategory}/${quizId}`);
        }

        const module: any = modules[matchKey as keyof typeof modules];
        const data: QuizData = module.default ?? module;
        setQuizData(data);
      } catch (error) {
        debug.error(`Error loading ${quizCategory} quiz data:`, error);
        navigate('/error');
      }
    };

    if (quizId && quizCategory) {
      loadQuizData();
    }
  }, [quizId, quizCategory, navigate]);

  if (!quizData) {
    return <div>Loading quiz...</div>;
  }

  const handleAnswerOptionClick = (option: string) => {
    if (selectedAnswer === option && !isCorrectAnswer) {
      return;
    }

    setSelectedAnswer(option);
    const correct = option.trim().toLowerCase() === quizData.questions[currentQuestionIndex].correct_answer.trim().toLowerCase();
    setIsCorrectAnswer(correct);

    if (correct) {
      setScore(score + 1);
      setAnswered(true);
    } else {
      setAnswered(false);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="mcq-test-container">
      <button onClick={() => navigate(routePrefix)} className="back-button">Back to {quizData.title} Quizzes</button>
      {showScore ? (
        <div className="score-section">
          <h2>Congratulations! You've completed the {quizData.title} quiz.</h2>
          <p>You scored {score} out of {quizData.questions.length}</p>
          <button onClick={() => navigate(routePrefix)}>Take Another Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/{quizData.questions.length}
            </div>
            <div className="question-text">{quizData.questions[currentQuestionIndex].question}</div>
          </div>
          <div className="answer-options">
            {quizData.questions[currentQuestionIndex].options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === option;
              let buttonClass = "answer-button";

              if (isSelected) {
                if (isCorrectAnswer === true) {
                  buttonClass += " correct";
                } else if (isCorrectAnswer === false) {
                  buttonClass += " incorrect";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerOptionClick(option)}
                  disabled={answered}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div className="feedback-section">
              {isCorrectAnswer ? (
                <>
                  <p className="feedback-correct">Correct!</p>
                  <button onClick={handleNextQuestion} className="next-question-button">
                    Next Question
                  </button>
                </>
              ) : (
                <p className="feedback-incorrect">Incorrect. Please try again.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizTest;