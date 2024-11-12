import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, images } from '@/theme';
import { Redirect, useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import CustomProgressBar from '@/components/CustomProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { googleSignIn, registerInAsync } from '@/store/actions/auth';
import * as Notifications from 'expo-notifications';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const registerForPushNotificationsAsync = async () => {
  try {
    let token = '';

    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return token;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: 'ba050b1f-eab5-4c81-a46d-6dd33f7ab0fd',
      })
    ).data;

    return token;
  } catch (error) {
    console.error('Error al obtener el token de notificación:', error);
    return '';
  }
};

const SignUp = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '675685533507-demdikbnbebra80kdud2vtql23jur3cv.apps.googleusercontent.com',
    webClientId: '675685533507-umbe36aorflnd0fn7kekmbm28q80b3ri.apps.googleusercontent.com',
    iosClientId: '',
    redirectUri: '(auth)/signup',
  });

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [error, setError] = useState('');

  const [inputEmailValue, setInputEmailValue] = useState('');
  const [emailIsFocused, setEmailIsFocused] = useState(false);

  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [inputConfirmPasswordValue, setInputConfirmPasswordValue] = useState('');
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const handleEmailFocus = () => {
    setEmailIsFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailIsFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordIsFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordIsFocused(false);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordIsFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordIsFocused(false);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleGoogleSignIn = async () => {
    if (active || active2) {
      return ;
    }
    setActive2(true);
    promptAsync();
  };

  const handleResponse = async () => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      const tokenNotifications = await registerForPushNotificationsAsync();
      dispatch(
        googleSignIn({
          token: response.authentication.accessToken,
          tokenNotifications,
          setActive: setActive2,
          setError,
          dispatch,
        }),
      );
    } else {
      setActive2(false);
    }
  };

  useEffect(() => {
    handleResponse();
  }, [response]);

  const handleNext = async () => {
    if (!inputEmailValue) {
      setError('Introduzca un Email');
      return;
    }
    if (!inputPasswordValue) {
      setError('Introduzca una contraseña');
      return;
    }
    if (inputConfirmPasswordValue !== inputPasswordValue) {
      setError('La contraseña debe coincidir');
      return;
    }

    if (active || active2) {
      return;
    }

    const tokenNotifications = await registerForPushNotificationsAsync();
    dispatch(
      registerInAsync({
        data: { email: inputEmailValue, password: inputPasswordValue },
        tokenNotifications,
        setActive,
        setError,
        dispatch,
      }),
    );
  };
  if (isAuth && user) {
    if (
      user.first_name &&
      user.last_name &&
      user.birthday &&
      user.email_verified === true
    ) return <Redirect href="/(dashboard)" />;

  if (isAuth && user !== null && user?.email_verified === false) {
    return <Redirect href="/(auth)/email_verify" />;
  }

  if (
    isAuth &&
    user !== null &&
    user?.email_verified === true &&
    (!user?.first_name || !user?.last_name || !user?.cuil || !user?.birthday || !user.phone)
  ) {
    return <Redirect href="/(auth)/signup2" />;
  }
  }

  
  return (
    <SafeAreaView style={styles.root}>

      <View style={styles.form}>
    <FocusAwareStatusBar barStyle='dark-content' />
        <View style={styles.logoContainer}>
          <Image source={images.logo_blue} style={styles.logo} />
        </View>
        <Text style={styles.title}>Registro</Text>
        <CustomProgressBar currentStep={0} totalSteps={3} />

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          onChangeText={text => setInputEmailValue(text)}
          editable={!active}
          style={[
            styles.textInput,
            {
              borderColor: emailIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: passwordIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}>
          <TextInput
            placeholder="Contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={colors.gray2}
            secureTextEntry={!passwordVisibility}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChangeText={text => setInputPasswordValue(text)}
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
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: confirmPasswordIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}>
          <TextInput
            placeholder="Repetir contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={colors.gray2}
            secureTextEntry={!confirmPasswordVisibility}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
            onChangeText={text => setInputConfirmPasswordValue(text)}
            editable={!active}
            style={[styles.textInputHidden]}
          />
          <Pressable onPress={handleConfirmPasswordVisibility}>
            <MaterialCommunityIcons
              name={confirmPasswordVisibility ? 'eye-outline' : 'eye-off-outline'}
              size={32}
              color={colors.blue}
            />
          </Pressable>
        </View>
        {error !== '' && <Text style={styles.errorMsj}>{error}</Text>}
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleNext}>
            {active && <ActivityIndicator size={22} color={colors.white} />}
            {!active && <Text style={styles.textNext}>Siguiente</Text>}
          </Pressable>
        </View>
        <Text style={styles.googleText}>O registrarse con tu cuenta de Google</Text>
        <View style={styles.googleIconContainer}>
          <Pressable onPress={handleGoogleSignIn}>
            {active2 && <ActivityIndicator size={32} color={colors.blue2} />}
            {!active2 && <Image source={images.google_button} style={styles.googleIcon} />}
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.gray,
  },
  errorMsj: {
    fontFamily: fonts.gotham.regular,
    color: 'red',
    textAlign: 'center',
  },
  containerNext: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 154,
    height: 48,
  },
  form: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.blue2,
    fontSize: 32,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    minHeight: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  textInputHidden: {
    flex: 1,
    minHeight: 48,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
  googleText: {
    fontFamily: fonts.gotham.regular,
    color: colors.gray3,
    fontSize: 14,
    verticalAlign: 'middle',
    textAlign: 'center',
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

export default SignUp;
