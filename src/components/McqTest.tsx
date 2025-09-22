import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mcqData1 from '../assets/json_data/ai_10_beginners.json';
import mcqData2 from '../assets/json_data/ai_20_beginners.json';
import mcqData3 from '../assets/json_data/country_capital.json';
import '../assets/css/McqTest.css';

const McqTest = () => {
  const { testId } = useParams();
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
    if (answered) return; // Prevent multiple selections

    setSelectedAnswer(option);
    setAnswered(true);

    const correct = option === mcqData[currentQuestion].answer;
    setIsCorrectAnswer(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < mcqData.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrectAnswer(null);
        setAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500); // 1.5 seconds delay for feedback
  };

  return (
    <div className="mcq-test-container">
      {showScore ? (
        <div className="score-section">
          <p>You scored {score} out of {mcqData.length}</p>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
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
            {mcqData[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === mcqData[currentQuestion].answer;
              let buttonClass = "answer-button";

              if (answered) {
                if (isSelected && isCorrectAnswer) {
                  buttonClass += " correct";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += " incorrect";
                } else if (isCorrectOption) {
                  buttonClass += " correct"; // Show correct answer even if not selected
                }
              } else if (isSelected) {
                buttonClass += " selected";
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
        </>
      )}
    </div>
  );
};

export default McqTest;