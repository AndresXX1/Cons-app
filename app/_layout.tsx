import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts, loadImages } from '@/theme';
import { verifySessionAsync, checkOnboarding } from '@/store/actions/auth';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootLayout />
      </Provider>
    </QueryClientProvider>
  );
};

const RootLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appReady, setAppReady] = useState<boolean>(false);
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const preloadAssets = async () => {
    try {
      await Promise.all([loadFonts(), loadImages()]);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const validateSessions = async () => {
      await dispatch(checkOnboarding());
      await dispatch(verifySessionAsync({ dispatch }));
    };
    validateSessions();
  }, [dispatch]);

  useEffect(() => {
    if (appReady && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [appReady, isLoading]);

  if (!appReady || isLoading) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default RootLayoutWrapper;
