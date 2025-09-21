import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mcqData1 from '../assets/json_data/ai_10_beginners.json';
import mcqData2 from '../assets/json_data/ai_20_beginners.json';
import mcqData3 from '../assets/json_data/country_capital.json';

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

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < mcqData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          You scored {score} out of {mcqData.length}
        </div>
      ) : (
        <>
          <div>
            <div>
              <span>Question {currentQuestion + 1}</span>/{mcqData.length}
            </div>
            <div>{mcqData[currentQuestion].question}</div>
          </div>
          <div>
            {mcqData[currentQuestion].options.map((option) => (
              <button
                onClick={() =>
                  handleAnswerOptionClick(
                    option === mcqData[currentQuestion].answer
                  )
                }
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default McqTest;