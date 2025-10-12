import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { PaymentStatus, UpgradePlan } from '../../types/payment';
import { RAZORPAY_CONFIG } from '../../config/payment';
import { useAuth, UserDetails } from '../../hook/useAuth';
import './Upgrade.css';

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userDetails } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserDetailsForm, setShowUserDetailsForm] = useState(false);
  const [tempUserDetails, setTempUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    contact: ''
  });

  const handleUpgradeClick = async () => {
    // Check if we have complete user details
    const hasCompleteDetails = userDetails.name && userDetails.email && userDetails.contact;

    if (!isLoggedIn || !hasCompleteDetails) {
      setShowUserDetailsForm(true);
      return;
    }

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      const proPlan: UpgradePlan = RAZORPAY_CONFIG.plans.pro;
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

  const handleUserDetailsSubmit = () => {
    // Validate that all required fields are filled
    if (!tempUserDetails.name || !tempUserDetails.email || !tempUserDetails.contact) {
      alert('Please fill in all fields');
      return;
    }

    // Update user details with the form data
    Object.assign(userDetails, tempUserDetails);
    setShowUserDetailsForm(false);

    // Now proceed with payment
    handleUpgradeClick();
  };

  const handleUserDetailsChange = (field: keyof UserDetails, value: string) => {
    setTempUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
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
            {/* <div className="subscription-badge">🔄 Auto-renewing subscription</div> */}
            {/* <p className="pricing-subtitle">Cancel anytime • 30-day money-back guarantee</p> */}

            <button
              className={`upgrade-pro-button ${isLoading ? 'loading' : ''}`}
              onClick={handleUpgradeClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Activating Subscription...
                </>
              ) : (
                <>
                  🚀 Upgrade to Pro
                </>
              )}
            </button>

            <div className="pricing-features">
              <p>✓ All premium features included</p>
              <p>✓ Secure payment processing</p>
              <p>🔄 Auto-renewing subscription</p>
              {/* <p>✓ No setup fees</p> */}
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
            <p>✅ Subscription activated successfully! Welcome to Pro! Your subscription will auto-renew yearly.</p>
            <button
              className="continue-button"
              onClick={() => navigate('/')}
            >
              Continue to Dashboard
            </button>
          </div>
        )}

        {showUserDetailsForm && (
          <div className="user-details-form-overlay">
            <div className="user-details-form">
              <h3>Complete Your Details</h3>
              <p>We need your information to process the payment securely.</p>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  value={tempUserDetails.name || ''}
                  onChange={(e) => handleUserDetailsChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={tempUserDetails.email || ''}
                  onChange={(e) => handleUserDetailsChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Phone Number *</label>
                <input
                  type="tel"
                  id="contact"
                  value={tempUserDetails.contact || ''}
                  onChange={(e) => handleUserDetailsChange('contact', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowUserDetailsForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-button"
                  onClick={handleUserDetailsSubmit}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Upgrade;