import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const ApplyForLoanScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={styles.title}>Quiero Mi Préstamo</Text>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['#F3E670', '#FFBA08']}
          style={styles.gradientBorder}>
          <View style={styles.containerLoan}>
            <Text style={styles.textLoan}>
              Préstamo disponible de{'\n'}
              <Text style={styles.textPriceLoan}>$300.000</Text>
            </Text>
          </View>
        </LinearGradient>
        <Text style={styles.textShare}>
          12 cuotas <Text style={styles.textShareSpan}>de $86.999</Text>
        </Text>
        <Pressable onPress={() => router.push('borrow_money')} style={styles.buttonRed}>
          <Text style={styles.textRed}>¡LO QUIERO AHORA!</Text>
        </Pressable>
        <Pressable onPress={() => router.push('more_options')}>
          <Text style={styles.textBlue}>Ver otras opciones</Text>
        </Pressable>

        <Text style={styles.textFinally}>
          La otorgación del préstamo está sujeta a{'\n'}análisis de riesgo crediticio.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
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
    height: '100%',
    width: '100%',
    marginHorizontal: 'auto',
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F3E670',
  },
  gradientBorder: {
    padding: 6,
    height: 117,
    borderRadius: 10,
    width: 330,
    marginHorizontal: 'auto',
  },
  textLoan: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 20,
    lineHeight: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  textPriceLoan: {
    fontSize: 48,
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
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
    marginHorizontal: 'auto',
    marginTop: 100,
  },
  textRed: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    lineHeight: 26.338,
    textTransform: 'capitalize',
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
