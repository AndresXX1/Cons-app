import { RootState } from '@/store';
import { Redirect } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

const Index = () => {
  const { isOnboarding, isAuth, user } = useSelector((state: RootState) => state.auth);

  if (!isOnboarding) {
    return <Redirect href="(onboarding)" />;
  }

  if (!isAuth) {
    return <Redirect href="(auth)" />;
  }

  if (isAuth && user !== null && !user?.email_verified) {
    return <Redirect href="email_verify" />;
  }

  if (
    isAuth &&
    user !== null &&
    user?.email_verified &&
    (!user?.first_name || !user.last_name || !user.cuil || !user.birthday || !user.phone)
  ) {
    return <Redirect href="signup2" />;
  }

  return <Redirect href="(dashboard)" />;
};

export default Index;
