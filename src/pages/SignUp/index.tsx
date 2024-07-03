import { colors, fonts } from '@theme';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Pressable, Text, TextInput } from 'react-native';
import { images } from 'src/theme/images';
import { logInAsync } from '../../store/actions/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import CustomProgressBar from '@components/CustomProgressBar';

interface SignUpProps {
  navigation?: any;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNext = () => {
    navigation.navigate('SignUp2', { email: inputEmailValue, password: inputPasswordValue });
  };

  return (
    <View style={styles.root}>
      <View style={styles.form}>
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
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: emailIsFocused
              ? colors.blue2
              : colors.gray2,
            },
          ]}
        />
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: passwordIsFocused
              ? colors.blue2
              : colors.gray2,
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
            editable={!isSubmitting}
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
              borderColor: confirmPasswordIsFocused
              ? colors.blue2
              : colors.gray2,
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
            editable={!isSubmitting}
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
          <Pressable onPress={handleNext}>
            <Text style={styles.buttonNext}>Siguiente</Text>
          </Pressable>
        </View>
        <Text style={styles.googleText}>O registrarse con tu cuenta de Google</Text>
        <View style={styles.googleIconContainer}>
          <Image source={images.google_button} style={styles.googleIcon} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 36,
    flex: 1,
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
    fontFamily: fonts.gotham.semiBold,
    backgroundColor: colors.blue,
    color: colors.white,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
