import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { colors, fonts, images } from '@/theme';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activateOnboarding } from '@/store/actions/auth';

const OnBoardingTwo = () => {
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = () => {
    route.push('step3');
  };

  const handleSkip = () => {
    dispatch(activateOnboarding('activated'));
  };

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground source={images.background} style={styles.backgroundImage} resizeMode="cover">
        <Text style={styles.title}>Registrarme o Iniciar Sesión</Text>
        <View style={styles.containerItem}>
          <Image source={images.money} style={styles.imageIcon} />
          <Text style={styles.text}>
            <Text style={styles.text2}>Préstamos:</Text> Paga tu cuota, consulta tus préstamos,
            renová o solicita un nuevo préstamo.
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Image source={images.bags} style={styles.imageIcon} />
          <Text style={styles.text}>
            <Text style={styles.text2}>ArgenCompras:</Text> Compra electrodomésticos, teléfonos y
            más en nuestra tienda en línea.
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Image source={images.star} style={styles.imageIcon} />
          <Text style={styles.text}>
            <Text style={styles.text2}>Cuponizate:</Text> Suscribite para recibir cupones
            exclusivos.
          </Text>
        </View>
        <View style={styles.containerItem}>
          <Image source={images.emoji_stars} style={styles.imageIcon} />
          <Text style={styles.text}>
            <Text style={styles.text2}>Préstamos:</Text> Paga tu cuota, consulta tus préstamos,
            renová o solicita un nuevo préstamo.
          </Text>
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
    alignItems: 'center',
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
    gap: 42,
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

export default OnBoardingTwo;
