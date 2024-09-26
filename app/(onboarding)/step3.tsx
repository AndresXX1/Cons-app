import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { colors, fonts, images } from '@/theme';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activateOnboarding } from '@/store/actions/auth';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const OnBoardingThree = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = () => {
    dispatch(activateOnboarding('activated'));
  };

  const handleSkip = () => {
    dispatch(activateOnboarding('activated'));
  };

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <ImageBackground source={images.background} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.title}>¿Necesitas ayuda?</Text>
        <View style={styles.container}>
          <View style={styles.containerItem}>
            <View style={styles.containerImage}>
              <Image source={images.help} style={styles.imageIcon} />
            </View>
            <Text style={styles.text}>
              Hace click en el <Text style={styles.text2}>ícono de ayuda</Text> en la esquina
              inferior derecha para preguntas frecuentes.
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.containerLine}>
            <View style={styles.lineActive} />
            <View style={styles.lineInactive} />
            <View style={styles.lineInactive} />
          </View>
          <Pressable onPress={handleNext}>
            <View style={styles.buttonNext}>
              <Text style={styles.textNext}>Siguiente</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleSkip}>
            <View style={styles.buttonSkip}>
              <Text style={styles.textSkip}>Omitir</Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 64,
    paddingHorizontal: 26,
  },
  title: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 36,
    color: '#ffffff',
    textAlign: 'center',
  },
  containerLine: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  lineActive: {
    width: 59,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  lineInactive: {
    width: 10,
    height: 7,
    opacity: 0.7,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
  buttonSkip: {
    width: 164,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSkip: {
    fontFamily: fonts.gotham.semiBold,
    textDecorationLine: 'underline',
    color: colors.white,
  },
  container: {
    justifyContent: 'center',
    gap: 42,
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItem: {
    gap: 10,
  },
  imageIcon: {
    width: 120,
    height: 120,
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

export default OnBoardingThree;
