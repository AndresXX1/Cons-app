import { colors, fonts, images } from '@/theme';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const BorrowMoneyScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <View>
        <View style={styles.circle}>
          <Image source={images.check_blue} style={styles.checkIcon} />
        </View>
        <Text style={styles.title}>¡En breve un asesor se contactara con vos!</Text>
        <Text style={styles.textDescription}>
          Horario de atención son de{'\n'}
          <Text style={styles.textDescriptionBold}>
            Lunes a Viernes de 08 a 20hs.{'\n'}Sábados de 09 a 13hs.
          </Text>
        </Text>
      </View>
      <View>
        <Pressable style={styles.btnWhite}>
          <Text style={styles.btnText}>Ver el estado de mi préstamo</Text>
        </Pressable>
        <Pressable onPress={() => router.push('apply_for_loan')}>
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
  title: {
    fontFamily: fonts.gotham.bold,
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  },
  circle: {
    width: 148,
    height: 148,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 64,
  },
  checkIcon: {
    width: 116,
    height: 116,
  },
  textDescription: {
    fontFamily: fonts.gotham.regular,
    fontSize: 20,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 64,
  },
  textDescriptionBold: {
    fontFamily: fonts.gotham.semiBold,
  },
  btnWhite: {
    backgroundColor: colors.white,
    height: 50,
    marginHorizontal: 20,
    padding: 15,
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
