// Import the context hook
import { useSubscriptionContext } from './SubscriptionContext';

// Re-export types with proper syntax
export type { SubscriptionState } from './SubscriptionContext';

// Re-export everything else from SubscriptionContext for backward compatibility
export {
  triggerSubscriptionRefresh,
  SubscriptionProvider
} from './SubscriptionContext';

// Export the context hook as well
export { useSubscriptionContext };

// Legacy hook - now just uses the context
export const useSubscription = () => {
  return useSubscriptionContext();
};