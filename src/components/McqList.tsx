import React from 'react';
import { Link } from 'react-router-dom';

const mcqTests = [
  { id: 'ai_10_beginners', name: 'AI for Beginners (10 Questions)' },
  { id: 'ai_20_beginners', name: 'AI for Beginners (20 Questions)' },
  { id: 'country_capital', name: 'Country Capitals' },
];

const McqList = () => {
  return (
    <div>
      <h2>Available Tests</h2>
      <ul>
        {mcqTests.map((test) => (
          <li key={test.id}>
            <Link to={`/test/${test.id}`}>{test.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default McqList;