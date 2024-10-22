import { useState } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '@/theme';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

const ChangePassword = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '675685533507-demdikbnbebra80kdud2vtql23jur3cv.apps.googleusercontent.com',
    webClientId: '675685533507-umbe36aorflnd0fn7kekmbm28q80b3ri.apps.googleusercontent.com',
    iosClientId: '',
  });

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [error, setError] = useState('');

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

  const handleNext = async () => {
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
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
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
            placeholder="Confirmar contraseña"
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
      </View>
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
    height: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    height: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
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

export default ChangePassword;
