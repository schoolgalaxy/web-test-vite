import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { PaymentStatus, UpgradePlan } from '../../types/payment';
import { RAZORPAY_CONFIG } from '../../config/payment';
import './Upgrade.css';

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgradeClick = async () => {
    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      const proPlan: UpgradePlan = RAZORPAY_CONFIG.plans.pro;

      // In a real app, you would get user details from authentication context
      const userDetails = {
        name: 'Test User', // Replace with actual user name
        email: 'test@example.com', // Replace with actual user email
        contact: '+919876543210' // Replace with actual user contact
      };

      await paymentService.initiatePayment(proPlan, userDetails);
      setPaymentStatus('idle');
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setPaymentStatus('failed');
      alert('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upgrade-wrapper">
      <div className="upgrade-form-content">
      <div className="upgrade-header">
        <h2>🚀 Upgrade to Pro</h2>
        <p className="upgrade-subtitle">Unlock unlimited access to all quizzes and premium content</p>
      </div>

      <div className="upgrade-form">
        {/* <div className="upgrade-benefits-section">
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <div className="benefit-content">
              <h3>Unlimited Quiz Access</h3>
              <p>Take as many quizzes as you want without any restrictions or limitations</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">📚</div>
            <div className="benefit-content">
              <h3>Premium Study Materials</h3>
              <p>Access exclusive slides, detailed explanations, and comprehensive learning resources</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">📊</div>
            <div className="benefit-content">
              <h3>Advanced Analytics</h3>
              <p>Get detailed progress tracking, performance insights, and personalized recommendations</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🏆</div>
            <div className="benefit-content">
              <h3>Achievement System</h3>
              <p>Unlock badges, certificates, and achievements for completed courses and milestones</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">📱</div>
            <div className="benefit-content">
              <h3>Offline Access</h3>
              <p>Download content for offline learning and study anywhere, anytime</p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🎓</div>
            <div className="benefit-content">
              <h3>Expert Support</h3>
              <p>Get direct access to learning experts and a supportive community</p>
            </div>
          </div>
        </div> */}

        <div className="pricing-section">
          <div className="pricing-card">
            <h3>Pro Plan</h3>
            <div className="price-display">
              <span className="currency">₹</span>
              <span className="amount">199</span>
              <span className="period">/year</span>
            </div>
            {/* <p className="pricing-subtitle">Cancel anytime • 30-day money-back guarantee</p> */}

            <button
              className={`upgrade-pro-button ${isLoading ? 'loading' : ''}`}
              onClick={handleUpgradeClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Processing Payment...
                </>
              ) : (
                <>
                  🚀 Upgrade to Pro
                </>
              )}
            </button>

            <div className="pricing-features">
              <p>✓ All premium features included</p>
              {/* <p>✓ No setup fees</p> */}
              <p>✓ Secure payment processing</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🎯 Why Choose Pro?</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Premium quizzes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Learning modules</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Access anytime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Practice Unlimitted</div>
            </div>
          </div>
        </div>

        <div className="security-info">
          <p>🔒 Your payment is secured with industry-standard encryption</p>
          {/* <p>💳 We accept all major credit cards and PayPal</p> */}
        </div>

        {paymentStatus === 'failed' && (
          <div className="payment-status error">
            <p>❌ Payment failed. Please try again or contact support if the issue persists.</p>
            <button
              className="retry-button"
              onClick={() => setPaymentStatus('idle')}
            >
              Try Again
            </button>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="payment-status success">
            <p>✅ Payment successful! Welcome to Pro! You now have access to all premium features.</p>
            <button
              className="continue-button"
              onClick={() => navigate('/')}
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Upgrade;