import React, { useRef } from 'react';
import { colors, fonts, images } from '@theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ApplyForLoanScreenProps {
  navigation?: any;
}

const ApplyForLoanScreen = ({ navigation }: ApplyForLoanScreenProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate('Home')} style={styles.btnBack}>
            <Image source={images.arrow_blue} style={styles.arrow} />
            <Text style={styles.btnBackText}>Volver atrás</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Quiero Mi Préstamo</Text>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#F3E670', '#FFBA08']}
          style={styles.gradientBorder}>
          <View style={styles.containerLoan}>
            <Text style={styles.textLoan}>Préstamo disponible de</Text>
            <Text style={styles.textPriceLoan}>$300.000</Text>
          </View>
        </LinearGradient>
        <Text style={styles.textShare}>
          12 cuotas <Text style={styles.textShareSpan}>de $86.999</Text>
        </Text>

        <Text style={styles.buttonRed}>¡LO QUIERO AHORA!</Text>

        <Text style={styles.textBlue}>Ver todas las sucursales</Text>

        <Text style={styles.textFinally}>
          La otorgación del préstamo está sujeta a análisis de riesgo crediticio.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
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
    color: colors.blue,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 30,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 40,
  },
  containerLoan: {
    backgroundColor: colors.blue2,
    borderRadius: 10,
    height: 117,
    width: 328,
    marginHorizontal: 'auto',
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#F3E670',
  },
  gradientBorder: {
    padding: 1, // Espacio para el borde
    borderRadius: 10,
    width: 330,
    marginHorizontal: 'auto',
  },
  textLoan: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 20,
    lineHeight: 26.338,
    marginBottom: 10,
  },
  textPriceLoan: {
    fontSize: 48,
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 26.338,
    marginBottom: 10,
  },
  textShare: {
    marginTop: 32,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    color: colors.texts,
    textAlign: 'center',
    marginBottom: 100,
  },
  textShareSpan: {
    fontFamily: fonts.gotham.regular,
  },
  buttonRed: {
    backgroundColor: '#E74D3E',
    height: 54,
    width: 328,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    lineHeight: 26.338,
    textTransform: 'capitalize',
    marginHorizontal: 'auto',
    marginTop: 100,
  },
  textBlue: {
    color: colors.blue,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 25,
    fontFamily: fonts.gotham.semiBold,
    borderBottomWidth: 1,
    marginHorizontal: 'auto',
    borderBottomColor: colors.blue,
    marginBottom: 40,
  },
  textFinally: {
    color: colors.texts,
    fontSize: 15,
    fontFamily: fonts.gotham.regular,
    lineHeight: 19,
    textAlign: 'center',
    width: 328,
    marginHorizontal: 'auto',
  },
});

export default ApplyForLoanScreen;
