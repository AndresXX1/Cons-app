import { colors, fonts, images } from '@theme';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image } from 'react-native';

const OnBoardingThree = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <View style={styles.containerImage}>
          <Image source={images.help} style={styles.imageIcon} />
        </View>
        <Text style={styles.text}>
          Hace click en el <Text style={styles.text2}>ícono de ayuda</Text> en la esquina inferior derecha para preguntas frecuentes.
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
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItem: {
    gap: 10,
  },
  imageIcon: {
    width: 144,
    height: 144,
  },
  text: {
    fontFamily: fonts.gotham.regular,
    textAlignVertical: "center",
    textAlign: "center",
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

export default OnBoardingThree;
