import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const AdvisorScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
        <View style={styles.circle}>
          <Image source={images.check_purple} style={styles.checkIcon} />
        </View>
        <Text style={styles.title}>¡En breve un asesor se contactara con vos!</Text>
        <Text style={styles.textDescription}>
          Horario de atención son de{'\n'}
          <Text style={styles.textDescriptionBold}>
            Lunes a Viernes de 08 a 20hs.{'\n'}Sábados de 09 a 13hs.
          </Text>
        </Text>
      </View>
      <Pressable onPress={() => router.push('benefits')}>
        <Text style={styles.textBack}>Volver al menú</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.purple,
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
  textBack: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default AdvisorScreen;
