import { useEffect } from "react";
import { verifySessionAsync, checkOnboarding } from "../store/actions/auth";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../pages/LoadingScreen";
import OnBoardingNavigator from "./OnBoardingNavigator";
import DashboardNavigator from "./DashboardNavigator";
import AuthNavigator from "./AuthNavigator";

const MainNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, isLoading, isOnboarding, user } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    const validateSessions = async () => {
      await dispatch(checkOnboarding());
      await dispatch(verifySessionAsync({ dispatch }));
    };
    validateSessions();
  }, [dispatch]);
  if (isLoading) 
  if (!isOnboarding) return <OnBoardingNavigator />;
  if (!isAuth) return <AuthNavigator />;
  if (!user) return <LoadingScreen />;

  return <DashboardNavigator />;
};

export default MainNavigator;
