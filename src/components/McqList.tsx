import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Banner.css';
import '../assets/css/McqList.css';

const mcqTests = [
  { id: 'ai_10_beginners', name: 'AI for Beginners (10 Questions)' },
  { id: 'ai_20_beginners', name: 'AI for Beginners (20 Questions)' },
  { id: 'country_capital', name: 'Country Capitals' },
];

const McqList = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>MCQ Test Platform</h2>
      <Banner />
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

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "It always seems impossible until it's done. – Nelson Mandela",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill"
];

const Banner = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      {quotes.map((quote, index) => (
        <p
          key={index}
          className={`banner-quote ${index === currentQuoteIndex ? 'visible' : 'hidden'}`}
        >
          {quote}
        </p>
      ))}
    </div>
  );
};

export default McqList;