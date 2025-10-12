import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';

export interface UserSubscription {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  subscriptionId: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  interval: string;
  period: number;
  status: string;
  razorpayPaymentId: string;
  razorpaySubscriptionId?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  features?: string[];
  notes?: string;
}

export class SubscriptionService {
  private static instance: SubscriptionService;
  private client = generateClient<Schema>();

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  // Helper function to transform Amplify data to local interface
  private transformAmplifySubscription(amplifySub: any): UserSubscription {
    return {
      id: amplifySub.id,
      userId: amplifySub.userId,
      userEmail: amplifySub.userEmail,
      userName: amplifySub.userName || undefined, // Convert null to undefined
      subscriptionId: amplifySub.subscriptionId,
      planId: amplifySub.planId,
      planName: amplifySub.planName,
      amount: amplifySub.amount,
      currency: amplifySub.currency,
      interval: amplifySub.interval,
      period: amplifySub.period,
      status: amplifySub.status,
      razorpayPaymentId: amplifySub.razorpayPaymentId,
      razorpaySubscriptionId: amplifySub.razorpaySubscriptionId || undefined,
      startDate: amplifySub.startDate,
      endDate: amplifySub.endDate || undefined,
      isActive: amplifySub.isActive,
      features: amplifySub.features || undefined,
      notes: amplifySub.notes || undefined,
    };
  }

  // Check if current user has an active subscription
  async hasActiveSubscription(): Promise<boolean> {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.log('🔐 No authenticated user found for subscription check');
        return false;
      }

      const userId = currentUser.userId || currentUser.username;
      console.log('🔍 Checking subscription for user:', userId);

      const { data: subscriptions } = await this.client.models.UserSubscription.list({
        filter: {
          userId: { eq: userId },
          isActive: { eq: true },
          status: { eq: 'active' }
        }
      });

      if (!subscriptions || subscriptions.length === 0) {
        console.log('❌ No active subscriptions found for user:', userId);
        return false;
      }

      console.log('📋 Found subscriptions:', subscriptions.length);

      // Check if any subscription is still valid (not expired)
      const now = new Date();
      const activeSubscription = subscriptions.find(sub => {
        if (!sub.endDate) {
          console.log('✅ Lifetime subscription found');
          return true; // No end date means lifetime
        }
        const isValid = new Date(sub.endDate) > now;
        console.log('📅 Subscription expiry check:', sub.endDate, 'Valid:', isValid);
        return isValid;
      });

      const result = !!activeSubscription;
      console.log('🎯 Final subscription status:', result);
      return result;

    } catch (error) {
      console.error('❌ Error checking subscription status:', error);
      return false;
    }
  }

  // Get current user's active subscription details
  async getActiveSubscription(): Promise<UserSubscription | null> {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return null;
      }

      const userId = currentUser.userId || currentUser.username;

      const { data: subscriptions } = await this.client.models.UserSubscription.list({
        filter: {
          userId: { eq: userId },
          isActive: { eq: true },
          status: { eq: 'active' }
        }
      });

      if (!subscriptions || subscriptions.length === 0) {
        return null;
      }

      // Return the most recent active subscription
      const now = new Date();
      const validSubscriptions = subscriptions.filter(sub => {
        if (!sub.endDate) return true; // No end date means lifetime
        return new Date(sub.endDate) > now;
      });

      if (validSubscriptions.length === 0) {
        return null;
      }

      // Sort by start date (most recent first) and return the first one
      validSubscriptions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      return this.transformAmplifySubscription(validSubscriptions[0]);

    } catch (error) {
      console.error('Error getting active subscription:', error);
      return null;
    }
  }

  // Check if user has access to premium features
  async hasPremiumAccess(): Promise<boolean> {
    return await this.hasActiveSubscription();
  }

  // Cancel user's subscription
  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      const result = await this.client.models.UserSubscription.update({
        id: subscriptionId,
        status: 'cancelled',
        isActive: false
      });

      return !!result.data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return false;
    }
  }
}

// Export singleton instance
export const subscriptionService = SubscriptionService.getInstance();