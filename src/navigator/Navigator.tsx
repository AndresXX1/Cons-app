//import { useEffect } from 'react';
//import { verifySessionAsync, checkOnboarding } from '../store/actions/auth';
//import { AppDispatch, RootState } from '../store';
//import { useDispatch, useSelector } from 'react-redux';
//import LoadingScreen from '../pages/LoadingScreen';
import OnBoardingNavigator from './OnBoardingNavigator';
//import DashboardNavigator from './DashboardNavigator';
//import AuthNavigator from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

const MainNavigator = () => {
  //const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <NavigationContainer>
        <OnBoardingNavigator />
      </NavigationContainer>
    </>
  );
  //if (isLoading) return <LoadingScreen />;
  //if (!isOnboarding) return <OnBoardingNavigator />;
  //if (!isAuth) return <AuthNavigator />;
  //if (!user) return <LoadingScreen />;

  //return <DashboardNavigator />;
};

export default MainNavigator;
