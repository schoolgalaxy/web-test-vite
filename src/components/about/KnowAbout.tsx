import { useState } from 'react';
import './KnowAbout.css';

interface Slide {
  id: number;
  title: string;
  content: string;
  image?: string;
}

const KnowAbout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Welcome to Our Platform",
      content: "Discover a world of knowledge and learning opportunities designed to help you grow and succeed in your educational journey.",
      image: "/icons/galaxy.png"
    },
    {
      id: 2,
      title: "Interactive Learning",
      content: "Experience engaging content with interactive quizzes, tests, and multimedia presentations that make learning fun and effective.",
    },
    {
      id: 3,
      title: "Multiple Categories",
      content: "Explore various topics including Animals, Birds, Sports, Space, Computer Science, and much more. Each category is carefully curated with accurate information.",
    },
    {
      id: 4,
      title: "Progress Tracking",
      content: "Monitor your learning progress with our built-in tracking system. See your scores, identify areas for improvement, and celebrate your achievements.",
    },
    {
      id: 5,
      title: "Mobile Friendly",
      content: "Access your learning materials anywhere, anytime. Our platform is fully responsive and works seamlessly across all devices.",
    },
    {
      id: 6,
      title: "Get Started Today",
      content: "Begin your learning adventure now! Choose from our wide range of categories and start exploring the fascinating world of knowledge.",
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="know-about-container">
      <div className="presentation-wrapper">
        <div className="slide-header">
          <h1>Know About Us</h1>
          <div className="slide-counter">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>

        <div className="slide-container">
          <div className="slide-content">
            {slides[currentSlide].image && (
              <div className="slide-image">
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
              </div>
            )}
            <div className="slide-text">
              <h2>{slides[currentSlide].title}</h2>
              <p>{slides[currentSlide].content}</p>
            </div>
          </div>
        </div>

        <div className="slide-navigation">
          <button
            onClick={prevSlide}
            className="nav-button prev-button"
            disabled={currentSlide === 0}
          >
            ← Previous
          </button>

          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="nav-button next-button"
            disabled={currentSlide === slides.length - 1}
          >
            Next →
          </button>
        </div>

        <div className="slide-progress">
          <div
            className="progress-bar"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowAbout;