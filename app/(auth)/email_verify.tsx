import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, images } from '@/theme';
import { Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { verifyCode, resendVerifyCode } from '@/store/service/user';
import { OTPInputText } from '@/components/OTPInputText';

const EmailVerify = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');

  const routerNext = () => {
    router.replace('/(auth)/signup2');
  };

  const handleNext = async () => {
    if (code.length !== 5) {
      setError('Introduce el codigo completo');
      return;
    }
    if (isSubmitting || isSubmitting2) {
      return;
    }
    setIsSubmitting(true);
    await verifyCode({
      code: code,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };

  const handleResendVerifyCode = async () => {
    if (isSubmitting2 || isSubmitting) {
      return;
    }
    setIsSubmitting2(true);
    await resendVerifyCode({
      setError,
      setIsSubmitting: setIsSubmitting2,
    });
  };

  console.log(user);
  

  // if (!isAuth) {
  //   return <Redirect href="/(auth)" />;
  // }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
        <Text style={styles.textPin}>Pin de seguridad</Text>
        <Text style={styles.textPinTwo}>
          Introduce el pin que enviamos a tu correo(revisa tu casillero de spam si no lo encontrás)
        </Text>
        <OTPInputText
          
          numberOfDigits={5}
          focusColor={colors.blue2}
          
          focusStickBlinkingDuration={500}
          onTextChange={text => {
            setError('');
            setCode(text);
          }}
          onFilled={text => console.log(`OTP is ${text}`)}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNextWhite} onPress={handleResendVerifyCode}>
            {isSubmitting2 && <ActivityIndicator size={22} color={colors.blue} />}
            {!isSubmitting2 && <Text style={styles.textNextBlue}>Reenviar Email</Text>}
          </Pressable>
        </View>
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNextBlue} onPress={handleNext}>
            {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
            {!isSubmitting && <Text style={styles.textNextWhite}>Siguiente</Text>}
          </Pressable>
        </View>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
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
  containerNext: {
    alignItems: 'center',
    justifyContent: 'center',
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
  textInput: {
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  error: {
    fontFamily: fonts.gotham.bold,
    fontSize: 12,
    color: colors.red,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonNextBlue: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNextWhite: {
    backgroundColor: colors.white,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  textNextWhite: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
  textNextBlue: {
    fontFamily: fonts.gotham.bold,
    color: colors.blue,
  },
  textPin: {
    color: colors.texts,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    marginTop: 38,
  },
  textPinTwo: {
    color: colors.gray2,
    fontFamily: fonts.gotham.regular,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 40,
  },
  textOpacity: {
    fontFamily: fonts.gotham.semiBold,
  },
});

export default EmailVerify;
