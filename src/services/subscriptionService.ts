import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { getCurrentUser } from 'aws-amplify/auth';
import { SubscriptionStatus } from '../types/payment';

// Debug function to check authentication and authorization
export const debugAuthStatus = async (): Promise<void> => {
  console.log('🔍 Debugging authentication status...');

  try {
    // Check if user is authenticated
    const currentUser = await getCurrentUser();
    console.log('👤 Current user:', currentUser ? {
      userId: currentUser.userId,
      username: currentUser.username,
      signInDetails: currentUser.signInDetails
    } : 'Not authenticated');

    // Check client configuration
    const client = generateClient<Schema>();
    console.log('🔧 Client configured:', !!client);

  } catch (error) {
    console.error('❌ Debug check failed:', error);
  }
};

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
  status: SubscriptionStatus;
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

      const userId = currentUser.username; // Use username to match cognito:username identity claim

      try {
        const { data: subscriptions } = await this.client.models.UserSubscription.list({
          filter: {
            userId: { eq: userId }
          }
        });

        if (!subscriptions || subscriptions.length === 0) {
          // console.log('❌ No active subscriptions found for user:', userId);
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

      } catch (apiError: any) {
        console.error('🚨 API Error checking subscription status:', apiError);

        // Check if it's an authorization error
        if (apiError.message && apiError.message.includes('Not Authorized')) {
          console.error('🔒 Authorization failed - user may not be properly authenticated');
          return false;
        }

        throw apiError; // Re-throw other errors
      }

    } catch (error) {
      console.error('❌ General error checking subscription status:', error);
      return false;
    }
  }

  // Get current user's subscription status and details in a single call
  async getSubscriptionStatus(): Promise<{ hasActive: boolean; subscription: UserSubscription | null }> {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.log('🔐 No authenticated user found');
        return { hasActive: false, subscription: null };
      }

      const userId = currentUser.username; // Use username to match cognito:username identity claim

      try {
        const { data: subscriptions } = await this.client.models.UserSubscription.list({
          filter: {
            userId: { eq: userId }
          }
        });

        if (!subscriptions || subscriptions.length === 0) {
          console.log('❌ No subscriptions found for user:', userId);
          return { hasActive: false, subscription: null };
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

        if (activeSubscription) {
          console.log('🎯 Active subscription found:', activeSubscription.subscriptionId);
          return {
            hasActive: true,
            subscription: this.transformAmplifySubscription(activeSubscription)
          };
        } else {
          console.log('❌ No active subscriptions found');
          return { hasActive: false, subscription: null };
        }

      } catch (apiError: any) {
        console.error('🚨 API Error checking subscription status:', apiError);

        // Check if it's an authorization error
        if (apiError.message && apiError.message.includes('Not Authorized')) {
          console.error('🔒 Authorization failed - user may not be properly authenticated');
          return { hasActive: false, subscription: null };
        }

        throw apiError; // Re-throw other errors
      }

    } catch (error) {
      console.error('❌ General error checking subscription status:', error);
      return { hasActive: false, subscription: null };
    }
  }

  // Get current user's active subscription details
  async getActiveSubscription(): Promise<UserSubscription | null> {
    const { subscription } = await this.getSubscriptionStatus();
    return subscription;
  }

  // Check if user has access to premium features
  async hasPremiumAccess(): Promise<boolean> {
    return await this.hasActiveSubscription();
  }

  // Cancel user's subscription
  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      // Get the current user to get their userId (which is the primary key for UserSubscription)
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error('User must be authenticated to cancel subscription');
      }

      const userId = currentUser.username; // Use username to match cognito:username identity claim

      // Find the specific subscription by both userId and subscriptionId
      const { data: subscriptions } = await this.client.models.UserSubscription.list({
        filter: {
          userId: { eq: userId },
          subscriptionId: { eq: subscriptionId }
        }
      });

      if (!subscriptions || subscriptions.length === 0) {
        throw new Error('Subscription not found');
      }

      const subscriptionToCancel = subscriptions[0];

      // Update using userId as the identifier (since it's the primary key per schema)
      const result = await this.client.models.UserSubscription.update({
        userId: subscriptionToCancel.userId,
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

// Test function to verify the subscription service works
export const testSubscriptionService = async (): Promise<void> => {
  console.log('🧪 Testing Subscription Service...');

  try {
    // First debug auth status
    await debugAuthStatus();

    // Test if user has active subscription
    console.log('\n🔍 Testing hasActiveSubscription...');
    const hasActive = await subscriptionService.hasActiveSubscription();
    console.log('📊 Has active subscription:', hasActive);

    // Test getting active subscription
    console.log('\n🔍 Testing getActiveSubscription...');
    const subscription = await subscriptionService.getActiveSubscription();
    console.log('📋 Active subscription:', subscription);

    console.log('\n✅ All tests completed successfully');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
};