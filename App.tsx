import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import MainNavigator from "./src/navigator/Navigator";
import { loadFonts } from "src/theme/fonts";
import { loadImages } from "src/theme/images";
import LoadingScreen from "src/pages/LoadingScreen";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const [appReady, setAppReady] = useState<boolean>(false);
  const preloadAssets = async () => {
    try {
      await Promise.all([loadFonts(), loadImages(), delay(2000)]);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  if (!appReady) {
    return <LoadingScreen />;
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
