import {  } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/McqList.css';

const mcqTests = [
  { id: 'ai_10_beginners', name: 'AI for Beginners (10 Questions)', description: 'Test your basic knowledge of Artificial Intelligence with these 10 fundamental questions.' },
  { id: 'ai_20_beginners', name: 'AI for Beginners (20 Questions)', description: 'A more comprehensive test to assess your foundational understanding of AI concepts.' },
  { id: 'country_capital', name: 'Country Capitals', description: 'Challenge your geographical knowledge by identifying the capitals of various countries.' },
];

const McqList = () => {
  return (
    <div className="mcq-list-container">
      <h2 className="mcq-list-title">MCQ Test Platform</h2>
      <p>Test your knowledge with our diverse range of multiple-choice quizzes.</p>
      <div className="mcq-tiles-grid">
        {mcqTests.map((test) => (
          <Link to={`/test/${test.id}`} key={test.id} className="mcq-tile-link">
            <div className="mcq-tile">
              <h3 className="mcq-tile-name">{test.name}</h3>
              <p className="mcq-tile-description">{test.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default McqList;