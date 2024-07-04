import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigator/Navigator';
import { loadFonts, loadImages } from '@theme';
import * as SplashScreen from 'expo-splash-screen';
import { Alert } from 'react-native';

SplashScreen.preventAutoHideAsync();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [appReady, setAppReady] = useState<boolean>(false);
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
    if (appReady) {
      Alert.alert('tesat');
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;

  return <MainNavigator />;
};

export default AppWrapper;
