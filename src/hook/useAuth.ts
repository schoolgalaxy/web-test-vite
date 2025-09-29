import { useAuthenticator } from '@aws-amplify/ui-react';

export const useAuth = () => {
  const { user } = useAuthenticator();
  const isLoggedIn = !!user;

  return {
    isLoggedIn,
    user
  };
};