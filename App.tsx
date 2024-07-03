import { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigator/Navigator';
import { loadFonts } from "@theme";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(error => {
  console.log(error);
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [appReady, setAppReady] = useState<boolean>(false);
  // const preloadAssets = async () => {
  //   try {
  //     await Promise.all([loadFonts()]);
  //   } finally {
  //     setAppReady(true);
  //   }
  // };

  // useEffect(() => {
  //   preloadAssets();
  // }, []);

  // useEffect(() => {
  //   if (appReady) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [appReady]);

  // if (!appReady) return null;

  return <MainNavigator />;
};

export default AppWrapper;
