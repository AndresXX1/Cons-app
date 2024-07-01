import { fonts } from '@theme';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import { images } from 'src/theme/images';
import { logInAsync } from '../../store/actions/auth';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@theme';

const { width, height } = Dimensions.get('window');

interface LogInProps {
  navigation?: any;
}

const LogIn = ({ navigation }: LogInProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);

  const handleEmailFocus = () => {
    setEmailIsFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordIsFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordIsFocused(true);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEmailBlur = () => {
    setEmailIsFocused(false);
  };
  const handleLogIn = () => {
    if (!data.email) {
      setError('Email is required');
      return;
    }
    if (!data.password) {
      setError('Password is required');
      return;
    }
    if (active) {
      return;
    }
    dispatch(logInAsync({ data, setActive, setError, dispatch }));
  };
  const handleInputChange = (name: string, value: string) => {
    setError('');
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate('Menu')} style={styles.btnBack}>
            <Image source={images.arrow_back} />
            <Text style={styles.btnBackText}>Volver atrás</Text>
          </Pressable>
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {error && <Text>{error}</Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={colors.gray2}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChangeText={text => setData({...data, email: text})}
            editable={!active}
            value={data.email}
            style={[
              styles.textInput,
              {
                borderColor: emailIsFocused ? colors.blue2 : colors.gray2,
              },
            ]}
          />
          <View style={[styles.inputContainer]}>
            <TextInput
              secureTextEntry={!passwordVisible}
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.gray2}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              onChangeText={text => setData({...data, password: text})}
              value={data.password}
              editable={!active}
              style={[styles.textInputHidden]}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={passwordVisibility ? 'eye-outline' : 'eye-off-outline'}
                size={32}
                color={colors.blue}
              />
            </Pressable>
          </View>

          <Text style={[styles.textReset]}>¿Has olvidado tu contraseña?</Text>

          <View style={styles.containerLogin}>
            <Pressable onPress={() => handleLogIn()}>
              <Text style={styles.buttonLogin}>Iniciar sesión</Text>
            </Pressable>
          </View>

          <Text style={[styles.textGoogle]}>O iniciar sesión con tu cuenta de Google</Text>

          <View style={styles.googleIconContainer}>
            <Image source={images.google_button} style={styles.googleIcon} />
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.gotham.bold,
    color: colors.blue2,
    fontSize: 32,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 54,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    height: 180,
    width: width,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
  },
  btnBackText: {
    color: '#ffffff',
    fontFamily: fonts.gotham.regular,
    marginBottom: 2,
  },
  logo: {
    width: 154,
    height: 48,
    marginHorizontal: width / 2 - 77,
  },
  form: {
    backgroundColor: '#F1F2F2',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: height - 180,
    width: width,
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginTop: 16,
    backgroundColor: colors.white,
  },
  textInputHidden: {
    flex: 1,
    height: 48,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  textInput: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  textReset: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 10,
  },
  containerLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 70,
    paddingTop: 60,
  },
  buttonLogin: {
    fontFamily: fonts.gotham.bold,
    backgroundColor: colors.blue,
    color: colors.white,
    fontSize: 20,
    width: 263,
    height: 54,
    borderRadius: 50,
    display: 'flex',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 26,
  },
  textGoogle: {
    textAlign: 'center',
    color: colors.gray3,
    fontSize: 14,
    fontFamily: fonts.gotham.regular,
    paddingBottom: 25,
  },
  googleIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 52,
    height: 52,
  },
});

export default LogIn;
