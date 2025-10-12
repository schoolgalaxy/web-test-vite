import React from 'react';
import { useAuth } from '../../hook/useAuth';
import { paymentService } from '../../services/paymentService';
import { RAZORPAY_CONFIG } from '../../config/payment';

interface UpgradePromptProps {
  feature?: string;
  title?: string;
  description?: string;
  className?: string;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  feature = "premium features",
  title = "Upgrade to Pro",
  description = "Unlock this feature and many more with our Pro subscription!",
  className = ""
}) => {
  const { userDetails } = useAuth();

  const handleUpgrade = async () => {
    try {
      const plan = RAZORPAY_CONFIG.plans.pro;
      await paymentService.initiatePayment(plan, userDetails);
    } catch (error) {
      console.error('Failed to initiate payment:', error);
    }
  };

  return (
    <div className={`upgrade-prompt bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 text-center ${className}`}>
      <div className="mb-4">
        <div className="text-4xl mb-2">🚀</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Pro Plan Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Unlimited access to all games</li>
            <li>• Premium quizzes and tests</li>
            <li>• Advanced analytics</li>
            <li>• Achievement system</li>
            <li>• Offline access</li>
            <li>• Expert support</li>
          </ul>
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2">
          ₹{RAZORPAY_CONFIG.plans.pro.amount}/year
        </div>
        <p className="text-sm text-gray-500 mb-4">Cancel anytime</p>
      </div>

      <button
        onClick={handleUpgrade}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Upgrade Now
      </button>

      <p className="text-xs text-gray-500 mt-3">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default UpgradePrompt;