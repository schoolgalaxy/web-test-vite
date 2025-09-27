import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mcqData1 from '../../assets/data/ai_10_beginners.json';
import mcqData2 from '../../assets/data/ai_20_beginners.json';
import mcqData3 from '../../assets/data/country_capital.json';
import '../../assets/css/McqTest.css';

const McqTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  let mcqData;
  if (testId === 'ai_10_beginners') {
    mcqData = mcqData1;
  } else if (testId === 'ai_20_beginners') {
    mcqData = mcqData2;
  } else {
    mcqData = mcqData3;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswerOptionClick = (option: string) => {
    // Allow re-selection if the previous answer was incorrect
    if (selectedAnswer === option && !isCorrectAnswer) {
      // If the user clicks the same incorrect answer again, do nothing
      return;
    }

    setSelectedAnswer(option);
    const correct = option === mcqData[currentQuestion].answer;
    setIsCorrectAnswer(correct);

    if (correct) {
      setScore(score + 1);
      setAnswered(true); // Only set answered to true if the answer is correct
    } else {
      setAnswered(false); // Keep answered false to allow re-attempts
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < mcqData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);
      setAnswered(false); // Reset answered state for the next question
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="mcq-test-container">
      <button onClick={() => navigate('/')} className="back-button">Back</button>
      {showScore ? (
        <div className="score-section">
          <h2>Congratulations! You've completed the quiz.</h2>
          <p>You scored {score} out of {mcqData.length}</p>
          <button onClick={() => window.location.reload()}>Take Another Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{mcqData.length}
            </div>
            <div className="question-text">{mcqData[currentQuestion].question}</div>
          </div>
          <div className="answer-options">
            {mcqData[currentQuestion].options.map((option: string, index: number) => {
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
                  disabled={answered} // Disable all options once the correct answer is found
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && ( // Show feedback if an answer is selected
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

export default McqTest;