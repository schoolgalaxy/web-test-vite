import { useState, useEffect } from 'react';
import '../assets/css/Banner.css';

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

export default Banner;