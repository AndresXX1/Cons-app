import { RootState } from '@/store';
import { Redirect } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';

const Index = () => {
  const { isOnboarding, isAuth } = useSelector((state: RootState) => state.auth);
 
  if (!isOnboarding) {
    return <Redirect href="(onboarding)" />;
  }

  if (!isAuth) {
    return <Redirect href="(auth)" />;
  }

  return <Redirect href="(dashboard)" />;
};

export default Index;
