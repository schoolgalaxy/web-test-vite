import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/css/QuizTest.css';
import debug from '../../util/debug';
import QuizScoreSection from './QuizScoreSection';
import { useAuth } from '../../hook/useAuth';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizData {
  title: string;
  description: string;
  profilePic: string;
  play_type?: string;
  questions: Question[];
}

interface QuizTestProps {
  quizCategory: string; // e.g., 'birds', 'animals'
  routePrefix: string; // e.g., '/birds-quiz', '/animals-quiz'
}

const QuizTest: React.FC<QuizTestProps> = ({ quizCategory, routePrefix }) => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [firstTimeCorrect, setFirstTimeCorrect] = useState(false);

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

        // Check if we should show login prompt for login_free content
        if (data.play_type === 'free' && !isLoggedIn) {
          setShowLoginPrompt(true);
        }
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

  // Handle login prompt for login_free content
  if (showLoginPrompt) {
    return (
      <div className="mcq-test-container-final">
        <button onClick={() => navigate(routePrefix)} className="back-button">Back to {quizData.title} Quizzes</button>

        <div className="login-prompt-section">
          <div className="login-prompt-header">
            <h2>🚀 Ready to Start Your Quiz?</h2>
          </div>

          

          <div className="promo-benefits-grid">
            <p className="login-prompt-subtitle">Login to unlock better features and track your progress!</p>

            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h4>Track Progress</h4>
              <p>Save your scores and monitor improvement over time</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h4>Detailed Analytics</h4>
              <p>Get insights into your learning patterns</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h4>Achievement Badges</h4>
              <p>Earn rewards for completing quizzes</p>
            </div>
            {/* <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h4>Maintain History</h4>
              <p>Keep a complete record of all your quiz attempts and results</p>
            </div> */}
            <div className="login-prompt-actions">
              <button
                className="secondary-button"
                onClick={() => setShowLoginPrompt(false)}
              >
                Skip for Now
              </button>
              <button
                className="primary-button"
                onClick={() => navigate('/login')}
              >
                Login to Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswerOptionClick = (option: string) => {
    // Prevent action if already answered correctly (first time)
    if (firstTimeCorrect && selectedAnswer === option) {
      return;
    }

    setSelectedAnswer(option);
    const correct = option.trim().toLowerCase() === quizData.questions[currentQuestionIndex].correct_answer.trim().toLowerCase();
    setIsCorrectAnswer(correct);

    if (correct) {
      // Only count score on first correct selection for this question
      if (!firstTimeCorrect) {
        setScore(score + 1);
      }
      setFirstTimeCorrect(true);
      setAnswered(true);
    } else {
      setAnswered(false);
      setFirstTimeCorrect(true);
      // Don't reset firstTimeCorrect here - keep it as true if it was the first correct answer
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
      setAnswered(false);
      setFirstTimeCorrect(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    setAnswered(false);
    setFirstTimeCorrect(false);
  };

  return (
    <div className="mcq-test-container-final">
      <button onClick={() => navigate(routePrefix)} className="back-button">Back to {quizData.title} Quizzes</button>
      {showScore ? (
        <QuizScoreSection
          title={quizData.title}
          score={score}
          totalQuestions={quizData.questions.length}
          routePrefix={routePrefix}
          onRetake={handleRetakeQuiz}
        />
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
              ) : isCorrectAnswer ? (
                <p className="feedback-correct">Correct! (Already answered)</p>
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