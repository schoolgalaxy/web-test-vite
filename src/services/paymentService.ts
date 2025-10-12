import {
  RazorpayOptions,
  RazorpayResponse,
  PaymentOrder,
  PaymentVerificationPayload,
  UpgradePlan
} from '../types/payment';
import { RAZORPAY_CONFIG, PAYMENT_MESSAGES } from '../config/payment';

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
const createOrder = async (amount: number, currency: string = 'INR'): Promise<PaymentOrder> => {
  // In a real application, this would make an API call to your backend
  // to create an order and return the order ID
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: orderId,
    amount: amount * 100, // Convert to paise
    currency,
    receipt: `receipt_${Date.now()}`,
    status: 'created',
    created_at: Date.now()
  };
};

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

export class PaymentService {
  private static instance: PaymentService;

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Initialize payment for a plan
  async initiatePayment(plan: UpgradePlan, userDetails?: { name?: string; email?: string; contact?: string }): Promise<void> {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create order
      const order = await createOrder(plan.amount, plan.currency);

      // Prepare Razorpay options
      const options: RazorpayOptions = {
        key: RAZORPAY_CONFIG.key_id,
        amount: order.amount,
        currency: order.currency,
        name: RAZORPAY_CONFIG.name,
        description: `${plan.name} - ${plan.period}`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          await this.handlePaymentSuccess(response, order.id);
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

      // Create and open Razorpay instance
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  }

  // Handle successful payment
  private async handlePaymentSuccess(response: RazorpayResponse, orderId: string): Promise<void> {
    try {
      const verificationPayload: PaymentVerificationPayload = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        order_id: orderId,
        payment_id: response.razorpay_payment_id,
      };

      // Verify payment on backend
      const isValid = await verifyPayment(verificationPayload);

      if (isValid) {
        // Show success message and handle post-payment logic
        this.showSuccessMessage(PAYMENT_MESSAGES.success);
        this.handlePostPaymentSuccess(response.razorpay_payment_id, orderId);
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
}

// Export singleton instance
export const paymentService = PaymentService.getInstance();