import { useState, useEffect } from 'react';
import { subscriptionService, UserSubscription } from '../services/subscriptionService';
import { useAuth } from './useAuth';

export interface SubscriptionState {
  hasActiveSubscription: boolean;
  subscription: UserSubscription | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const useSubscription = () => {
  const { isLoggedIn } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    hasActiveSubscription: false,
    subscription: null,
    isLoading: true,
    error: null,
    isAuthenticated: isLoggedIn
  });

  const checkSubscriptionStatus = async () => {
    // Only check subscription if user is authenticated
    if (!isLoggedIn) {
      setState({
        hasActiveSubscription: false,
        subscription: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const [hasActive, subscription] = await Promise.all([
        subscriptionService.hasActiveSubscription(),
        subscriptionService.getActiveSubscription()
      ]);

      setState({
        hasActiveSubscription: hasActive,
        subscription,
        isLoading: false,
        error: null,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setState({
        hasActiveSubscription: false,
        subscription: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to check subscription',
        isAuthenticated: true
      });
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  // Update authentication state when login status changes
  useEffect(() => {
    setState(prev => ({ ...prev, isAuthenticated: isLoggedIn }));
    // Re-check subscription status when authentication state changes
    if (isLoggedIn) {
      checkSubscriptionStatus();
    } else {
      // Clear subscription data when user logs out
      setState(prev => ({
        ...prev,
        hasActiveSubscription: false,
        subscription: null,
        error: null,
        isAuthenticated: false
      }));
    }
  }, [isLoggedIn]);

  const refreshSubscription = (): void => {
    checkSubscriptionStatus();
  };

  return {
    ...state,
    refreshSubscription
  };
};