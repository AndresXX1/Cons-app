import { colors, fonts, images } from '@theme';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image } from 'react-native';

const OnBoardingTwo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <Image source={images.money} style={styles.imageIcon} />
        <Text style={styles.text}>
          <Text style={styles.text2}>Préstamos:</Text> Paga tu cuota, consulta tus préstamos, renová
          o solicita un nuevo préstamo.
        </Text>
      </View>
      <View style={styles.containerItem}>
        <Image source={images.bags} style={styles.imageIcon} />
        <Text style={styles.text}>
          <Text style={styles.text2}>ArgenCompras:</Text> Compra electrodomésticos, teléfonos y más en nuestra tienda en línea.
        </Text>
      </View>
      <View style={styles.containerItem}>
        <Image source={images.star} style={styles.imageIcon} />
        <Text style={styles.text}>
          <Text style={styles.text2}>Cuponizate:</Text> Suscribite para recibir cupones exclusivos.
        </Text>
      </View>
      <View style={styles.containerItem}>
        <Image source={images.emoji_stars} style={styles.imageIcon} />
        <Text style={styles.text}>
          <Text style={styles.text2}>Préstamos:</Text> Paga tu cuota, consulta tus préstamos, renová
          o solicita un nuevo préstamo.
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

export default OnBoardingTwo;
