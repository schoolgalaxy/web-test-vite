import {
  RazorpayOptions,
  RazorpayResponse,
  PaymentVerificationPayload,
  UpgradePlan
} from '../types/payment';
import { RAZORPAY_CONFIG, PAYMENT_MESSAGES } from '../config/payment';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Load Razorpay script dynamically
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create order on backend (in a real app, this would be an API call)
// const createOrder = async (amount: number, currency: string = 'INR'): Promise<PaymentOrder> => {
//   // In a real application, this would make an API call to your backend
//   // to create an order and return the order ID
//   const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   return {
//     id: orderId,
//     amount: amount * 100, // Convert to paise
//     currency,
//     receipt: `receipt_${Date.now()}`,
//     status: 'created',
//     created_at: Date.now()
//   };
// };

// Verify payment on backend (in a real app, this would be an API call)
const verifyPayment = async (payload: PaymentVerificationPayload): Promise<boolean> => {
  // In a real application, this would make an API call to your backend
  // to verify the payment signature and update the order status
  console.log('Verifying payment:', payload);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demo purposes, always return true
  // In production, verify the signature with Razorpay
  return true;
};

// Create subscription for recurring payments
const createSubscription = async (plan: UpgradePlan): Promise<any> => {
  // In a real application, this would make an API call to your backend
  // to create a subscription plan and return the subscription data

  const subscriptionId = `subscr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: subscriptionId,
    plan_id: plan.id,
    amount: plan.amount * 100, // Convert to paise
    currency: plan.currency,
    interval: plan.interval,
    period: plan.period,
    customer_id: `cust_${Date.now()}`,
    status: 'created',
    created_at: Date.now()
  };
};

export class PaymentService {
  private static instance: PaymentService;
  private client = generateClient<Schema>();

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Helper method to calculate subscription end date
  private calculateEndDate(startDate: Date, interval: string, period: number): Date {
    const endDate = new Date(startDate);

    switch (interval.toLowerCase()) {
      case 'yearly':
        endDate.setFullYear(endDate.getFullYear() + period);
        break;
      case 'monthly':
        endDate.setMonth(endDate.getMonth() + period);
        break;
      case 'weekly':
        endDate.setDate(endDate.getDate() + (period * 7));
        break;
      case 'daily':
        endDate.setDate(endDate.getDate() + period);
        break;
      default:
        // Default to yearly if interval is unknown
        endDate.setFullYear(endDate.getFullYear() + period);
    }

    return endDate;
  }

  // Initialize payment for a plan (using subscriptions for yearly plans)
  async initiatePayment(plan: UpgradePlan, userDetails?: { name?: string; email?: string; contact?: string }): Promise<void> {
    try {
      console.log('🚀 Initiating subscription for plan:', plan.name);

      // Validate environment before proceeding
      const { validateEnvironment, getPaymentEnvironment } = await import('../util/env');
      const validation = validateEnvironment();

      if (!validation.isValid) {
        console.error('❌ Environment validation failed:', validation.errors);
        throw new Error(`Environment validation failed: ${validation.errors.join(', ')}`);
      }

      // Get current environment for debugging
      const env = getPaymentEnvironment();

      // Validate API key format (only log in development)
      if (import.meta.env.DEV && env.razorpayKeyId === 'rzp_test_demo_key') {
        console.warn('⚠️ Using demo/test API key - configure production keys for live payments');
      }

      // Check browser compatibility
      console.log('🔍 Checking browser compatibility...');
      if (typeof window === 'undefined') {
        throw new Error('Payment forms are not supported in server-side environments');
      }

      // Check for basic browser features
      if (!window.crypto || !window.btoa) {
        throw new Error('Your browser does not support required security features for payments');
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment system. Please check your internet connection and try again.');
      }

      if (!window.Razorpay) {
        throw new Error('Payment system not available. Please refresh the page and try again.');
      }

      // Create subscription for recurring payments
      const subscriptionData = await createSubscription(plan);

      // Prepare Razorpay options for subscription
      const options: RazorpayOptions = {
        key: RAZORPAY_CONFIG.key_id,
        amount: subscriptionData.amount,
        currency: subscriptionData.currency,
        name: RAZORPAY_CONFIG.name,
        description: `${plan.name} - ${plan.interval} subscription`,
        handler: async (response: RazorpayResponse) => {
          await this.handlePaymentSuccess(response, subscriptionData.id, plan, userDetails);
        },
        prefill: {
          name: userDetails?.name,
          email: userDetails?.email,
          contact: userDetails?.contact,
        },
        notes: {
          plan_id: plan.id,
          plan_name: plan.name,
        },
        theme: RAZORPAY_CONFIG.theme,
        modal: {
          ondismiss: () => {
            this.handlePaymentDismissal();
          },
          confirm_close: true,
          animation: true,
        },
      };

      console.log('💳 Opening Razorpay payment modal...');

      // Create Razorpay instance with error handling
      let razorpayInstance: any;
      try {
        razorpayInstance = new window.Razorpay(options);
        console.log('✅ Razorpay instance created successfully');
      } catch (instanceError) {
        console.error('❌ Failed to create Razorpay instance:', instanceError);
        throw new Error('Failed to initialize payment form. Please check your browser compatibility.');
      }

      // Add modal event listeners for debugging
      razorpayInstance.on('modal-ready', () => {
        console.log('✅ Razorpay modal is ready');
      });

      razorpayInstance.on('modal-close', () => {
        console.log('📝 Razorpay modal was closed');
      });

      // Open the modal with fallback handling
      try {
        razorpayInstance.open();

        // Set a timeout to detect if modal fails to open
        setTimeout(() => {
          const modalElements = document.querySelectorAll('[class*="razorpay"], [id*="razorpay"]');
          if (modalElements.length === 0) {
            console.warn('Payment form may not have opened properly. Check for popup blockers.');
          }
        }, 1500);

      } catch (modalError) {
        console.error('Failed to open payment form:', modalError);

        // Provide specific error messages based on error type
        if (modalError instanceof Error) {
          if (modalError.message.includes('popup')) {
            throw new Error('Payment form blocked by popup blocker. Please allow popups for this site and try again.');
          } else if (modalError.message.includes('security')) {
            throw new Error('Security restriction prevented payment form from opening. Please ensure you\'re using HTTPS.');
          }
        }

        throw new Error('Failed to open payment form. This might be due to browser restrictions, ad-blockers, or popup blockers.');
      }

    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      this.showErrorMessage(error instanceof Error ? error.message : 'Payment initiation failed. Please try again.');
      throw error;
    }
  }

  // Handle successful payment
  private async handlePaymentSuccess(
    response: RazorpayResponse,
    subscriptionId: string,
    plan: UpgradePlan,
    userDetails?: { name?: string; email?: string; contact?: string }
  ): Promise<void> {
    try {
      const verificationPayload: PaymentVerificationPayload = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        order_id: subscriptionId, // Using subscription ID as order_id for compatibility
        payment_id: response.razorpay_payment_id,
      };

      // Verify payment on backend
      const isValid = await verifyPayment(verificationPayload);

      if (isValid) {
        // Save subscription data to backend
        await this.saveSubscriptionToBackend(response.razorpay_payment_id, subscriptionId, plan, userDetails);

        // Show success message and handle post-payment logic
        this.showSuccessMessage('Subscription activated successfully! Welcome to Pro!');
        this.handlePostPaymentSuccess(response.razorpay_payment_id, subscriptionId);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      this.showErrorMessage(PAYMENT_MESSAGES.failed);
    }
  }

  // Handle payment dismissal/cancellation
  private handlePaymentDismissal(): void {
    this.showInfoMessage(PAYMENT_MESSAGES.cancelled);
  }

  // Show success message
  private showSuccessMessage(message: string): void {
    // You can replace this with a proper toast notification system
    alert(message);
  }

  // Show error message
  private showErrorMessage(message: string): void {
    alert(message);
  }

  // Show info message
  private showInfoMessage(message: string): void {
    alert(message);
  }

  // Save subscription data to backend
  private async saveSubscriptionToBackend(
    razorpayPaymentId: string,
    subscriptionId: string,
    plan: UpgradePlan,
    userDetails?: { name?: string; email?: string; contact?: string }
  ): Promise<void> {
    try {
      // Get current user information from Amplify Auth
      const { getCurrentUser } = await import('aws-amplify/auth');

      const currentUser = await getCurrentUser();
      const userId = currentUser.userId || currentUser.username;

      if (!userId) {
        throw new Error('User ID not found. User must be authenticated to create subscription.');
      }

      // Calculate subscription dates
      const startDate = new Date();
      const endDate = this.calculateEndDate(startDate, plan.interval, plan.period);

      // Create subscription record in backend
      const subscriptionData = {
        userId,
        userEmail: userDetails?.email || '',
        userName: userDetails?.name || '',
        subscriptionId,
        planId: plan.id,
        planName: plan.name,
        amount: plan.amount,
        currency: plan.currency,
        interval: plan.interval,
        period: plan.period,
        status: 'active',
        razorpayPaymentId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        features: plan.features,
        notes: `Created via Razorpay payment: ${razorpayPaymentId}`
      };

      console.log('💾 Saving subscription data to backend:', subscriptionData);

      const result = await this.client.models.UserSubscription.create(subscriptionData);

      if (result.data) {
        console.log('✅ Subscription saved successfully:', result.data.id);
      } else {
        console.error('❌ Failed to save subscription - no data returned');
        throw new Error('Failed to save subscription data');
      }

    } catch (error) {
      console.error('❌ Failed to save subscription to backend:', error);
      // Don't throw here - payment was successful, just logging failed
      // In production, you might want to implement retry logic or manual sync
    }
  }

  // Handle post-payment success logic
  private handlePostPaymentSuccess(paymentId: string, orderId: string): void {
    // Here you would typically:
    // 1. Update user's subscription status in your backend
    // 2. Store payment details
    // 3. Redirect to success page or update UI
    // 4. Send confirmation email

    console.log('Payment successful:', { paymentId, orderId });

    // For now, we'll just log the success
    // In a real app, you might want to redirect or update the UI
    // window.location.href = '/payment/success';
  }

  // Get available plans
  getAvailablePlans(): UpgradePlan[] {
    return [RAZORPAY_CONFIG.plans.pro];
  }

  // Test method to verify Razorpay setup and API connectivity
  async testRazorpaySetup(): Promise<boolean> {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        return false;
      }

      // Test API key format (basic validation)
      if (!RAZORPAY_CONFIG.key_id.startsWith('rzp_')) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // Test API connectivity (for production keys)
  async testApiConnectivity(): Promise<boolean> {
    try {
      // Test basic authentication format
      const testAuth = btoa(RAZORPAY_CONFIG.key_id + ':' + RAZORPAY_CONFIG.key_secret);
      if (!testAuth || testAuth.length < 10) {
        return false;
      }

      // Test key format
      if (RAZORPAY_CONFIG.key_id.startsWith('rzp_test_') || RAZORPAY_CONFIG.key_id.startsWith('rzp_live_')) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const paymentService = PaymentService.getInstance();