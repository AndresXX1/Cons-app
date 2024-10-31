import { colors, fonts, images } from '@/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const BorrowMoneyScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const loanMoney = params.loanData;

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <View>
        <View style={styles.circle}>
          <Image source={images.check_blue} style={styles.checkIcon} />
        </View>
          <Text style={styles.textLoan}>
            Préstamo disponible de{'\n'}
            <Text style={styles.textPriceLoan}>{loanMoney}</Text>
          </Text>
        <Text style={styles.title}>¡En breve un asesor se contactara con vos!</Text>
        <Text style={styles.textDescription}>
          Horario de atención son de{'\n'}
          <Text style={styles.textDescriptionBold}>
            Lunes a Viernes de 08 a 20hs.{'\n'}Sábados de 09 a 13hs.
          </Text>
        </Text>
      </View>
      <View>
        <Pressable style={styles.btnWhite} onPress={() => router.push('loan')}>
          <Text style={styles.btnText}>Ver mis préstamos</Text>
        </Pressable>
        <Pressable onPress={() => router.push('')}>
          <Text style={styles.textBack}>Volver al menú</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.skyBlue,
    justifyContent: 'space-between',
  },
  textLoan: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 22,
    lineHeight: 40,
  },
  textPriceLoan: {
    fontSize: 48,
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    fontSize: 20,
    color: colors.white,
    marginHorizontal: "auto",
    maxWidth: 300,

  },
  circle: {
    width: 148,
    height: 148,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  checkIcon: {
    width: 116,
    height: 116,
  },
  textDescription: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 84,
  },
  textDescriptionBold: {
    fontFamily: fonts.gotham.bold,
    fontSize: 16,
  },
  btnWhite: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 50,
    marginBottom: 30,
  },
  btnText: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.blue,
    textAlign: 'center',
  },
  textBack: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default BorrowMoneyScreen;
