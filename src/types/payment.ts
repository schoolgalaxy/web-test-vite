export interface RazorpayOptions {
  key: string;
  amount: number; // Amount in smallest currency unit (paise for INR)
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    address?: string;
    [key: string]: string | undefined;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
    animation?: boolean;
    backdropclose?: boolean;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface SubscriptionRequest {
  plan_id: string;
  total_count: number; // Number of billing cycles
  quantity?: number;
  customer_notify?: boolean;
  notes?: Record<string, string>;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'weekly' | 'daily';
  period: number; // Interval period (e.g., 1 for yearly)
  features: string[];
}

export interface PaymentVerificationPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  order_id: string;
  payment_id: string;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'cancelled';

export interface PaymentState {
  status: PaymentStatus;
  error?: string;
  paymentId?: string;
  orderId?: string;
}

export interface UpgradePlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'weekly' | 'daily';
  period: number; // Number of intervals (e.g., 1 for yearly)
  features: string[];
}