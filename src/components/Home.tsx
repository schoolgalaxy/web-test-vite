import { Link } from 'react-router-dom';
import McqList from './McqList';
import Banner from './Banner';
import '../assets/css/Home.css'; // Import the new Home CSS
import About from './About';

const Home = () => {
  return (
    <div className="home-layout">
      <div className="left-pane">
        <h3>Categories</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/class-1-5">Class 1-5</Link></li>
          <li><Link to="/class-5-9">Class 5-9</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      <div className="middle-pane">
        <div className="hero-section">
          <h1>Welcome to the MCQ Test Platform</h1>
          <p>Test your knowledge with our diverse range of multiple-choice quizzes.</p>
        </div>
        <div className="mcq-list-section">
          <McqList />
        </div>
        <Banner />
      </div>

      <div className="right-pane">
        <h3>Fun Activities for Kids</h3>
        <div className="ad-content">
          <p>Learn about animals with interactive quizzes!</p>
          <img src="/src/assets/react.svg" alt="Animal Quiz Ad" />
        </div>
        <div className="ad-content">
          <p>Improve your math skills with engaging games!</p>
          <img src="/src/assets/vite.svg" alt="Math Games Ad" />
        </div>
      </div>
    </div>
  );
};

export default Home;