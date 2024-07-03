import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ImageBackground, Image, Dimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { colors, images } from '@theme';

const { width } = Dimensions.get('window');
const logoMargin = 44;

const LoadingScreen = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <ImageBackground
          source={images.background}
          style={styles.backgroundImage}
          resizeMode="cover">
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
          <Text style={styles.title} numberOfLines={1}>
            TEST
          </Text>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 24,
    color: colors.white,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width - 2 * logoMargin,
    height: (width - 2 * logoMargin) * 0.312,
  },
});

export default LoadingScreen;
