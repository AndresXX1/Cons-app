import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { fonts, colors, images } from '@/theme';
import { useRef } from 'react';

const SingleCupon = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.back}></View>
        <Image source={images.image_recom} style={styles.imageRecom}></Image>
        <Text style={styles.textDescount}>20%</Text>
        <Text style={styles.textTitle}>Coderhouse Online</Text>
        <Text style={styles.textBenefits}>Puedes usar este beneficio en:</Text>
        <Text style={styles.online}>
          <Image source={images.world} style={styles.imageWorld}></Image>Online
        </Text>
        <Text style={styles.buttonGreen}>¡Quiero este cupón!</Text>

        <View style={styles.containerDescrip}>
          <Text style={styles.textDescrip}>Descripción del beneficio</Text>
          <Text style={styles.textDescrip}>-</Text>
        </View>
        <View style={styles.containerRest}>
          <Text style={styles.textRest}>
            <Text style={styles.textRestBlack}>¡Desbloquee su potencial al máximo!</Text> Disfrute
            de un 20% de descuento adicional sobre el Plan CoderBeca ingresando a la url que figura
            al solicitar el beneficio.
          </Text>
          <Text style={styles.textRestBlack}>Pasos para acceder al beneficio:</Text>
          <Text style={styles.textRest}>
            1- Ingrese al link que figura al acceder al beneficio.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginBottom: 50,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
  },
  back: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnBack: {
    display: 'flex',
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
    marginVertical: 24,
  },
  arrow: {
    width: 14,
    height: 24,
  },
  btnBackText: {
    color: colors.purple,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  imageRecom: {
    width: 156,
    height: 149,
    marginTop: 37,
    marginHorizontal: 'auto',
  },
  textDescount: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: 900,
    lineHeight: 78.6,
    color: colors.texts,
  },
  textTitle: {
    color: colors.texts,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 400,
    lineHeight: 32.75,
    fontFamily: fonts.gotham.regular,
    marginBottom: 24,
  },
  textBenefits: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    textAlign: 'center',
    fontWeight: 400,
    lineHeight: 20.96,
    fontSize: 16,
    marginBottom: 23,
  },
  imageWorld: {
    width: 18,
    height: 18,
  },
  online: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    width: 90,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 'auto',
    gap: 5,
    fontSize: 14,
    color: colors.purple,
    fontFamily: fonts.gotham.regular,
    lineHeight: 18.34,
    fontWeight: 400,
    marginBottom: 56,
  },
  buttonGreen: {
    backgroundColor: colors.purple,
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    lineHeight: 26.338,
    textTransform: 'capitalize',
    marginHorizontal: 'auto',
    marginBottom: 34,
  },
  containerDescrip: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  textDescrip: {
    color: colors.texts,
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 26.2,
    fontFamily: fonts.gotham.regular,
    marginBottom: 21,
  },
  containerRest: {
    marginHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  textRest: {
    color: colors.texts,
    fontSize: 13,
    fontFamily: fonts.gotham.regular,
    fontWeight: 400,
    lineHeight: 15,
  },
  textRestBlack: {
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: 400,
  },
});

export default SingleCupon;
