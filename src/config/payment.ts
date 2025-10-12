// Payment configuration for different environments
//
// Environment Variables Setup in AWS Amplify:
// 1. Go to AWS Amplify Console > Your App > App Settings > Environment Variables
// 2. Add the following variables:
//    - VITE_RAZORPAY_KEY_ID: Your Razorpay Key ID (from Razorpay Dashboard)
//    - VITE_RAZORPAY_KEY_SECRET: Your Razorpay Secret (from Razorpay Dashboard)
//
// Note: The key_secret is used for server-side operations and should be handled securely
//
// HOW TO ACCESS AMPLIFY ENVIRONMENT VARIABLES:
//
// 1. Regular Environment Variables:
//    - Set in: Amplify Console > App Settings > Environment Variables
//    - Access in code: import.meta.env.VITE_YOUR_VARIABLE_NAME
//    - Available at: Build time and runtime
//
// 2. Secrets & Environment Variables (Encrypted):
//    - Set in: Amplify Console > App Settings > Environment Variables > "Secrets"
//    - Access in code: import.meta.env.VITE_YOUR_SECRET_NAME
//    - Available at: Runtime only (not visible in build logs)
//    - Use for: Sensitive data like API secrets, database passwords
//
// 3. Build-time vs Runtime Variables:
//    - Build-time: Available during build process (VITE_ prefix)
//    - Runtime: Available when app is running (all variables)
//    - Frontend: Can only access VITE_ prefixed variables
//
// SECURITY BEST PRACTICES:
// - Use "Secrets" for sensitive data like API secrets
// - Never commit API keys to version control
// - Use different keys for development/staging/production
// - Monitor API key usage in Razorpay dashboard
import { getPaymentEnvironment, validateEnvironment } from '../util/env';

// Initialize and validate environment configuration
const env = getPaymentEnvironment();
const validation = validateEnvironment();

if (!validation.isValid) {
  console.error('Environment validation failed:', validation.errors);
}

export const RAZORPAY_CONFIG = {
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret,

  // Company/Platform details
  name: 'Test Prep Platform',
  description: 'Upgrade to Pro Plan',
  image: '/logo.png', // Optional: Add your logo

  // Theme configuration
  theme: {
    color: '#2563eb', // Primary blue color
  },

  // Subscription plans (using Razorpay Subscriptions)
  plans: {
    pro: {
      id: 'pro_yearly',
      name: 'Pro Plan',
      amount: 199, // Amount in rupees per billing cycle
      currency: 'INR',
      interval: 'yearly' as const,
      period: 1, // 1 year
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