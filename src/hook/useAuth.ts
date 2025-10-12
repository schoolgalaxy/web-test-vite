import { useAuthenticator } from '@aws-amplify/ui-react';

export interface UserDetails {
  name?: string;
  email?: string;
  contact?: string;
  username?: string;
  userId?: string;
}

export const useAuth = () => {
  const { user } = useAuthenticator();
  const isLoggedIn = !!user;

  // Extract user details from Amplify user object
  const getUserDetails = (authUser: any): UserDetails => {
    if (!authUser) return {};

    return {
      name: authUser.attributes?.name || authUser.attributes?.given_name || authUser.attributes?.nickname,
      email: authUser.attributes?.email || authUser.signInDetails?.loginId,
      contact: authUser.attributes?.phone_number,
      username: authUser.username,
      userId: authUser.userId || authUser.attributes?.sub
    };
  };

  const userDetails: UserDetails = getUserDetails(user);

  return {
    isLoggedIn,
    user,
    userDetails
  };
};