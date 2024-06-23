import { colors, fonts, images } from '@theme';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image } from 'react-native';

const OnBoardingOne = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Image source={images.hand} style={styles.imageIcon} />
        <Text style={styles.text}>
          Si es tu primera vez aca, toca
          <Text style={styles.text2}> "Registrarme".</Text>
        </Text>
      </View>
      <View style={styles.containerItem}>
        <Image source={images.hand} style={styles.imageIcon} />
        <Text style={styles.text}>
          Si ya tenes una cuenta, toca
          <Text style={styles.text2}> "Iniciar Sesión"</Text> para ingresar.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 32,
  },
  containerItem: {
    gap: 10,
    flexDirection: 'row',
  },
  imageIcon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: fonts.gotham.regular,
    fontSize: 18,
    lineHeight: 24,
    color: colors.white,
  },
  text2: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 18,
    lineHeight: 24,
  },
});

export default OnBoardingOne;
