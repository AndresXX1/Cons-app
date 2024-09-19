import { useState } from 'react';
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
import CustomProgressBar from '@/components/CustomProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { registerInAsync } from '@/store/actions/auth';

const SignUp = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [active, setActive] = useState(false);
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
  /*
  const handleNext = () => {
    router.push('signup2');
  };*/

  const handleNext = () => {
    if (!inputEmailValue) {
      setError('Introdusca un Email');
      return;
    }
    if (!inputPasswordValue) {
      setError('Introdusca una contraseña');
      return;
    }
    if (inputConfirmPasswordValue !== inputPasswordValue) {
      setError('La contraseña debe coincidir');
      return;
    }
    if (active) {
      return;
    }
    dispatch(
      registerInAsync({
        data: { email: inputEmailValue, password: inputPasswordValue },
        setActive,
        setError,
        dispatch,
      }),
    );
  };

  if (isAuth && user?.first_name && user.last_name && user.birthday && user)
    return <Redirect href="(dashboard)" />;

  if (isAuth) {
    return <Redirect href="signup2" />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
        <View style={styles.logoContainer}>
          <Image source={images.logo_blue} style={styles.logo} />
        </View>
        <Text style={styles.title}>Registro</Text>
        <CustomProgressBar currentStep={0} totalSteps={3} />
        {error !== '' && <Text>{error}</Text>}
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
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleNext}>
            {active && <ActivityIndicator size={22} color={colors.white} />}
            {!active && <Text style={styles.textNext}>Siguiente</Text>}
          </Pressable>
        </View>
        <Text style={styles.googleText}>O registrarse con tu cuenta de Google</Text>
        <View style={styles.googleIconContainer}>
          <Image source={images.google_button} style={styles.googleIcon} />
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
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  textInput: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  textInputHidden: {
    flex: 1,
    height: 48,
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
