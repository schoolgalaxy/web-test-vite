import { Link } from 'react-router-dom';
import '../../assets/css/McqList.css';
// import aiImg from '/src/assets/img/ai.svg';
import aiBeginnerImg from '/src/assets/img/ai-beginner.svg';
import aiAdvancedImg from '/src/assets/img/ai-advanced.svg';
import globeImg from '/src/assets/img/globe.svg';
import placeholderImg from '/src/assets/img/quiz-placeholder.svg';

const mcqTests = [
  { id: 'ai_10_beginners', name: 'AI for Beginners (10 Questions)', description: 'Test your basic knowledge of Artificial Intelligence with these 10 fundamental questions.', img: aiBeginnerImg },
  { id: 'ai_20_beginners', name: 'AI for Beginners (20 Questions)', description: 'A more comprehensive test to assess your foundational understanding of AI concepts.', img: aiAdvancedImg },
  { id: 'country_capital', name: 'Country Capitals', description: 'Challenge your geographical knowledge by identifying the capitals of various countries.', img: globeImg },
];

const McqList = () => {
  return (
    <div className="mcq-list-container">
      <h2 className="mcq-list-title">MCQ Test Platform</h2>
      <p>Test your knowledge with our diverse range of multiple-choice quizzes.</p>
      <div className="mcq-tiles-grid">
        {mcqTests.map((test, index) => (
          <Link to={`/test/${test.id}`} key={test.id} className="mcq-tile-link">
            <div className={`mcq-tile ${index % 2 === 0 ? 'left-image' : 'right-image'}`}>
              <img
                src={test.img || placeholderImg}
                alt={test.name}
                className={`mcq-tile-profile-pic ${index % 2 === 0 ? 'left' : 'right'}`}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = placeholderImg;
                }}
              />
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