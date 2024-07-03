import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigator/Navigator';
import { loadFonts, loadImages } from '@theme';
import * as SplashScreen from 'expo-splash-screen';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

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
  const preloadAssets = async () => {
    try {
      await Promise.all([loadFonts(), loadImages()]);
    } finally {
      setAppReady(true);
    }
    try {
      await Promise.all([loadFonts(), loadImages()]);
      setAppReady(true);
    } catch (error) {
      // Captura cualquier error que ocurra durante la carga
      console.error('Error loading assets:', error);
      // Muestra una alerta en caso de error (Android)
      Alert.alert(
        'Error',
        'Hubo un problema al cargar los recursos.',
        [{ text: 'OK', onPress: () => console.log('Alert closed') }],
        { cancelable: false },
      );
      // Puedes decidir qué hacer después de mostrar la alerta, como manejar el error de otra manera
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test - {appReady.toString()}</Text>
    </View>
  );

  if (!appReady) return null;

  return <MainNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    verticalAlign: 'middle',
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 54,
  },
});

export default AppWrapper;
