import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import './LoginPromo.css';

const LoginPromo: React.FC = () => {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="login-promo-wrapper">
      <div className="login-promo-container">
        {/* Left side: Encouraging content */}
        <div className="promo-content-section">
          <div className="promo-header">
            <h2>🚀 Unlock Your True Potential</h2>
            <p className="promo-subtitle">Join thousands discovering their capabilities through our comprehensive assessment platform</p>
          </div>

          {/* <div className="promo-benefits-section">
            <div className="benefit-item">
              <div className="benefit-icon">💎</div>
              <div className="benefit-content">
                <h3>Discover Your Potential</h3>
                <p>Unlock hidden talents and abilities through our advanced assessment algorithms and personalized insights</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">⭐</div>
              <div className="benefit-content">
                <h3>Showcase Your Talent</h3>
                <p>Demonstrate your unique skills across multiple domains with our comprehensive evaluation system</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🧠</div>
              <div className="benefit-content">
                <h3>Enhance Your IQ</h3>
                <p>Sharpen cognitive abilities with brain-training exercises and intelligence-building activities</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <div className="benefit-content">
                <h3>Build Winning Attitude</h3>
                <p>Develop growth mindset and mental resilience through motivational content and progress tracking</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">🏆</div>
              <div className="benefit-content">
                <h3>Extracurricular Excellence</h3>
                <p>Explore diverse activities and interests that complement academic journey and personal development</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">📊</div>
              <div className="benefit-content">
                <h3>Track Your Growth</h3>
                <p>Monitor progress across all dimensions with detailed analytics and personalized recommendations</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h3>🎯 Why Choose Our Platform?</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free Access</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Assessment Tools</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Available</div>
              </div>
            </div>
          </div> */}

          <div className="cta-section">
            <div className="cta-content">
              {/* <h3>✨ Ready to Discover Your True Self?</h3> */}
              <p>Start your journey of self-discovery with our comprehensive assessment platform. Completely free!</p>
              <div className="cta-features">
                <span>✓ No Credit Card Required</span>
                <span>✓ Instant Access</span>
                <span>✓ Personalized Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="promo-form-section">
          <div className="promo-form-container">
            <div className="form-header">
              <h3>🚀 Start Your Journey</h3>
              <p>Get instant access to all assessments and track your personal growth</p>
            </div>
            <Authenticator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromo;