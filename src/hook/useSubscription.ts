import { useState, useEffect } from 'react';
import { subscriptionService, UserSubscription } from '../services/subscriptionService';

export interface SubscriptionState {
  hasActiveSubscription: boolean;
  subscription: UserSubscription | null;
  isLoading: boolean;
  error: string | null;
}

export const useSubscription = () => {
  const [state, setState] = useState<SubscriptionState>({
    hasActiveSubscription: false,
    subscription: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const checkSubscription = async () => {
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
          error: null
        });
      } catch (error) {
        console.error('Error in useSubscription:', error);
        setState({
          hasActiveSubscription: false,
          subscription: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to check subscription'
        });
      }
    };

    checkSubscription();
  }, []);

  const refreshSubscription = () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const checkSubscription = async () => {
      try {
        const [hasActive, subscription] = await Promise.all([
          subscriptionService.hasActiveSubscription(),
          subscriptionService.getActiveSubscription()
        ]);

        setState({
          hasActiveSubscription: hasActive,
          subscription,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error refreshing subscription:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to refresh subscription'
        }));
      }
    };

    checkSubscription();
  };

  return {
    ...state,
    refreshSubscription
  };
};