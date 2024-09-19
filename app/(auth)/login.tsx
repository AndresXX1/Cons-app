import { AppDispatch, RootState } from '@/store';
import { logInAsync } from '@/store/actions/auth';
import { colors, fonts, images } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const { width, height } = Dimensions.get('window');

const LogIn = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
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

  if (isAuth && user?.first_name && user.last_name && user.birthday)
    return <Redirect href="(dashboard)" />;

  if ((!user?.first_name || !user.last_name || !user.cuil) && isAuth && user) {
    return <Redirect href="signup2" />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <Image source={images.logo} style={styles.logo} resizeMode="cover" />
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {error !== '' && <Text>{error}</Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          onChangeText={text => setData({ ...data, email: text })}
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
            secureTextEntry={!passwordVisibility}
            placeholder="Contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={colors.gray2}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChangeText={text => setData({ ...data, password: text })}
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
          <Pressable style={styles.buttonLogin} onPress={() => handleLogIn()}>
            {active && <ActivityIndicator size={22} color={colors.white} />}
            {!active && <Text style={styles.textLogin}>Iniciar sesión</Text>}
          </Pressable>
        </View>

        <Text style={[styles.textGoogle]}>O iniciar sesión con tu cuenta de Google</Text>

        <View style={styles.googleIconContainer}>
          <Image source={images.google_button} style={styles.googleIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.blue2,
    justifyContent: 'flex-end',
    gap: 26,
  },
  title: {
    fontFamily: fonts.gotham.bold,
    color: colors.blue2,
    fontSize: 32,
    verticalAlign: 'middle',
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
    backgroundColor: colors.blue,
    width: 263,
    height: 54,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 26,
  },
  textLogin: {
    fontFamily: fonts.gotham.bold,
    color: colors.white,
    fontSize: 20,
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
