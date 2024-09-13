import React, { useRef } from 'react';
import { colors, fonts } from '@/theme';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FontAwesome } from '@expo/vector-icons';

const ApplyForLoanScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const { user, smarter } = useSelector((state: RootState) => state.auth);

  const isEligible = smarter?.offer;
  const loanAmount = isEligible ? smarter.offer.maximoCapital : '0';
  const monthlyPayment = isEligible ? smarter.offer.maximoCuota : '0';

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}>
          {isEligible ? (
            <>
              <Text style={styles.title}>Quiero Mi Préstamo</Text>
              <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={['#F3E670', '#FFBA08']}
                style={styles.gradientBorder}>
                <View style={styles.containerLoan}>
                  <Text style={styles.textLoan}>
                    Préstamo disponible de{'\n'}
                    <Text style={styles.textPriceLoan}>${loanAmount}</Text>
                  </Text>
                </View>
              </LinearGradient>
              <Text style={styles.textShare}>
                12 cuotas <Text style={styles.textShareSpan}>de ${monthlyPayment}</Text>
              </Text>
              <Pressable onPress={() => router.push('borrow_money')} style={styles.buttonRed}>
                <Text style={styles.textRed}>¡LO QUIERO AHORA!</Text>
              </Pressable>
              <Pressable onPress={() => router.push('more_options')}>
                <Text style={styles.textBlue}>Ver otras opciones</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.notEligibleContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name="frown-o" size={64} color="#D32F2F" />
              </View>
              <Text style={styles.notEligibleText}>
                Aun no tienes una oferta disponible,{' '}
                <Text style={styles.boldText}>contacta a un asesor</Text> para que evalue tu
                situación.
              </Text>
              <Pressable style={styles.contactButton}>
                <Text style={styles.contactButtonText}>CONTACTAR ASESOR</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
        <Text style={styles.textFinally}>
          La otorgación del préstamo está sujeta a{'\n'}análisis de riesgo crediticio.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 52,
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
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 40,
    marginTop: 52,
  },
  containerLoan: {
    backgroundColor: colors.blue2,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 6,
    maxHeight: 140,
    borderRadius: 10,
    width: 330,
    marginHorizontal: 'auto',
  },
  textLoan: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  textPriceLoan: {
    fontSize: 42,
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    lineHeight: 48,
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  notEligibleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: -40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  notEligibleText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.texts,
    marginBottom: 40,
    fontFamily: fonts.gotham.regular,
    paddingHorizontal: 10,
  },
  boldText: {
    fontFamily: fonts.gotham.bold,
  },
  contactButton: {
    backgroundColor: '#E74D3E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.gotham.bold,
  },
});

export default ApplyForLoanScreen;
