import { colors, fonts, images } from '@theme';
//import { StatusBar } from 'expo-status-bar';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { activateOnboarding } from '../../store/actions/auth';

interface OnBoardingOneProps {
  navigation?: any;
}

const OnBoardingOne = ({ navigation }: OnBoardingOneProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = () => {
    navigation.navigate('card-1');
  };

  const handleSkip = () => {
    dispatch(activateOnboarding('activated'));
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={images.background} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.title}>Registrarme o Iniciar Sesión</Text>
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={styles.containerItem}>
              <Image source={images.hand} style={styles.imageIcon} />
              <Text style={styles.text}>
                Si es tu primera vez aca, toca
                <Text style={styles.text2}> "Registrarme".</Text>
              </Text>
            </View>
            <View style={styles.containerItem}>
              <Image source={images.hand} style={styles.imageIcon} />
              <Text style={styles.text}>
                Si ya tenes una cuenta, toca
                <Text style={styles.text2}> "Iniciar Sesión"</Text> para ingresar.
              </Text>
            </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 36,
    color: '#ffffff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  body: {
    height: 350,
    width: '100%',
    paddingHorizontal: 20,
  },
  containerLine: {
    display: 'flex',
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSkip: {
    fontFamily: fonts.gotham.semiBold,
    textDecorationLine: 'underline',
    color: colors.white,
  },
  container: {
    flex: 1,
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

export default OnBoardingOne;
