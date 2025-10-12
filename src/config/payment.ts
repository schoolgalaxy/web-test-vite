// Payment configuration for different environments
//
// Environment Variables Setup in AWS Amplify:
// 1. Go to AWS Amplify Console > Your App > App Settings > Environment Variables
// 2. Add the following variables:
//    - VITE_RAZORPAY_KEY_ID: Your Razorpay Key ID (from Razorpay Dashboard)
//    - VITE_RAZORPAY_KEY_SECRET: Your Razorpay Secret (from Razorpay Dashboard)
//
// Note: The key_secret is used for server-side operations and should be handled securely
export const RAZORPAY_CONFIG = {
  key_id: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo_key',
  key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET || 'demo_secret_key',

  // Company/Platform details
  name: 'Test Prep Platform',
  description: 'Upgrade to Pro Plan',
  image: '/logo.png', // Optional: Add your logo

  // Theme configuration
  theme: {
    color: '#2563eb', // Primary blue color
  },

  // Payment plans
  plans: {
    pro: {
      id: 'pro_yearly',
      name: 'Pro Plan',
      amount: 199, // Amount in rupees
      currency: 'INR',
      period: 'year',
      features: [
        'Unlimited Quiz Access',
        'Premium Study Materials',
        'Advanced Analytics',
        'Achievement System',
        'Offline Access',
        'Expert Support'
      ]
    }
  }
};

// Payment status messages
export const PAYMENT_MESSAGES = {
  success: 'Payment successful! Welcome to Pro!',
  failed: 'Payment failed. Please try again.',
  cancelled: 'Payment cancelled.',
  processing: 'Processing your payment...'
};