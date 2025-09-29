import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '../../assets/css/Explore.css';

interface Slide {
  slide_number: number;
  title: string;
  content: string | string[];
}

interface PresentationData {
  title: string;
  description: string;
  slides: Slide[];
  unique_id: string;
}

const KnowPresentation = () => {
  const { category, uniqueId } = useParams<{ category: string; uniqueId: string }>();
  const { user } = useAuthenticator();
  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPresentation = async () => {
      if (!category || !uniqueId) return;

      try {
        // Load all JSON files and find the matching one
        const allModules = import.meta.glob('/src/assets/know/*/*.json', { eager: true });

        let foundModule: any = null;
        for (const [path, module] of Object.entries(allModules)) {
          if (path.includes(`/know/${category}/`) && (module as any).default?.unique_id === uniqueId) {
            foundModule = module;
            break;
          }
        }

        if (foundModule) {
          const data = foundModule.default;
          setPresentation(data);
          setCurrentSlide(0); // Reset to first slide
        }
      } catch (error) {
        console.error('Error loading presentation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPresentation();
  }, [category, uniqueId]);

  const nextSlide = () => {
    if (presentation && currentSlide < presentation.slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  if (loading) {
    return (
      <div className="data-folder-widget">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div className="data-folder-widget">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Presentation Not Found</h3>
          <p>The requested presentation could not be loaded.</p>
          <Link to={`/know/${category}`} className="back-link">← Back to {category} Content</Link>
        </div>
      </div>
    );
  }

  const currentSlideData = currentSlide < presentation.slides.length ? presentation.slides[currentSlide] : null;
  const totalSlides = presentation.slides.length + 1; // +1 for congratulation slide
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="presentation-container">
      <div className="presentation-header">
        <div className="presentation-info">
          <h1>{presentation.title}</h1>
          <p className="presentation-description">{presentation.description}</p>
        </div>
        <Link to={`/know/${category}`} className="back-button">
          ← Back to {category}
        </Link>
      </div>

      <div className="presentation-wrapper">
        <div className="slide-container">
          <div className="slide-header">
            <h2>{currentSlide === presentation.slides.length ? '🎉 Congratulations!' : currentSlideData?.title}</h2>
            <div className="slide-counter">
              Slide {currentSlide + 1} of {totalSlides}
            </div>
          </div>

          <div className="slide-content">
            {/* Show congratulation message on the slide after the last content slide */}
            {currentSlide === presentation.slides.length ? (
              <div className="congratulation-message">
                {/* <h3>Congratulations!</h3> */}
                <h3>Great job learning about <strong>{presentation.title}</strong>!</h3>
                <div className="completion-stats">
                  {/* <p>📊 Presentation completed: <strong>{presentation.slides.length} slides</strong></p> */}
                  {/* <p>⭐ Ready for more? Keep exploring to learn more!</p> */}
                </div>

                {/* Sign-in encouragement for non-authenticated users */}
                {!user && (
                  <div className="signin-encouragement">
                    <div className="signin-prompt">
                      <h4>🚀 Unlock More Features! Keep exploring to learn more!</h4>
                      <p>Sign in to track your progress, save favorites, and access exclusive content!</p>
                      <Link to="/login" className="signin-button">
                        Sign In Now
                      </Link>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="completion-actions" style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setCurrentSlide(0)}
                    className="action-button"
                    style={{
                      background: 'transparent',
                      border: '1px solid #4A90E2',
                      color: '#4A90E2',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      minWidth: '110px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#4A90E2';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#4A90E2';
                    }}
                  >
                    🔄 Retake
                  </button>
                  <Link
                    to={`/know/${category}`}
                    className="action-button"
                    style={{
                      background: 'transparent',
                      border: '1px solid #4A90E2',
                      color: '#4A90E2',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      minWidth: '110px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#4A90E2';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#4A90E2';
                    }}
                  >
                    {/* ←  */}
                    See more of {category}
                  </Link>
                 
                </div>
              </div>
            ) : (
              <>
                {currentSlideData && Array.isArray(currentSlideData.content) ? (
                  <ul>
                    {currentSlideData.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{currentSlideData?.content}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Hide slide navigation during congratulation */}
        {currentSlide !== presentation.slides.length && (
          <div className="slide-navigation">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="nav-button prev-button"
            >
              ← Previous
            </button>

            <div className="slide-thumbnails">
              {presentation.slides.map((slide, index) => (
                <button
                  key={slide.slide_number}
                  onClick={() => goToSlide(index)}
                  className={`thumbnail-button ${index === currentSlide ? 'active' : ''}`}
                  title={slide.title}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === presentation.slides.length}
              className="nav-button next-button"
            >
              {currentSlide === presentation.slides.length - 1 ? 'Finish →' : 'Next →'}
            </button>
          </div>
        )}

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default KnowPresentation;