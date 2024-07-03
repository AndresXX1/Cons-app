import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { colors, images, fonts } from '@theme';

const { width } = Dimensions.get('window');
const logoMargin = 44;

interface MenuAuthProps {
  navigation?: any;
}

const MenuAuth = ({ navigation }: MenuAuthProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.background} style={styles.backgroundImage} resizeMode="cover">
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        <Pressable
          style={styles.btnRegister}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={styles.register}>Registrarme</Text>
        </Pressable>
        <Pressable
          style={styles.btnLogIn}
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text style={styles.logIn}>Iniciar Sesión</Text>
        </Pressable>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width - 2 * logoMargin,
    height: (width - 2 * logoMargin) * 0.312,
    marginBottom: 70,
  },
  btnRegister: {
    width: width - 112,
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
  },
  register: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.blue,
    fontSize: 20,
  },
  btnLogIn: {
    width: width - 112,
    height: 54,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logIn: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 20,
  },
});

export default MenuAuth;
