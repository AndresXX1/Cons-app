import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const SettlementScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
        <View style={styles.circle}>
          <Image source={images.mood} style={styles.checkIcon} />
        </View>
        <Text style={styles.title}>¡Felicitaciones estas al día{'\n'}con tu préstamo!*</Text>
        <Text style={styles.textDescription}>
          Seguí así para sumar puntos y{'\n'}participar de los sorteos{'\n'}mensuales.
        </Text>
      </View>
      <View>
        <Pressable style={styles.btnWhite} onPress={() => router.push('loan')}>
          <Text style={styles.btnText}>Volver atrás</Text>
        </Pressable>
        <Text style={styles.textEnd}>*Salvo error u omisión</Text>
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
    marginTop: 16,
  },
  checkIcon: {
    width: 88,
    height: 88,
  },
  textDescription: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 64,
  },
  btnWhite: {
    backgroundColor: colors.white,
    height: 50,
    width: 150,
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.blue,
    textAlign: 'center',
  },
  textEnd: {
    fontFamily: fonts.gotham.regular,
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 30,
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 24,
    gap: 9,
  },
  btnBackText: {
    color: '#ffffff',
    fontFamily: fonts.gotham.regular,
    marginBottom: 2,
  },
});

export default SettlementScreen;
