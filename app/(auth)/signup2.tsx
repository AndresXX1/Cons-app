import { useEffect, useState } from 'react';
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
import CustomProgressBar from '@/components/CustomProgressBar';
import { colors, fonts, images } from '@/theme';
import { Redirect, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateFirstData } from '@/store/service/user';

const SignUp2 = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [inputNameValue, setInputNameValue] = useState(user?.first_name || '');
  const [nameIsFocused, setNameIsFocused] = useState(false);

  const [inputLastNameValue, setInputLastNameValue] = useState(user?.last_name || '');
  const [lastNameIsFocused, setLastNameIsFocused] = useState(false);

  const [inputCUILValue, setInputCUILValue] = useState(user?.cuil || '');
  const [cUILIsFocused, setCUILIsFocused] = useState(false);

  const handleNameFocus = () => {
    setNameIsFocused(true);
  };

  const handleNameBlur = () => {
    setNameIsFocused(false);
  };

  const handleLastNameFocus = () => {
    setLastNameIsFocused(true);
  };

  const handleLastNameBlur = () => {
    setLastNameIsFocused(false);
  };

  const handleCUILFocus = () => {
    setCUILIsFocused(true);
  };

  const handleCUILBlur = () => {
    setCUILIsFocused(false);
  };

  const routerNext = () => {
    router.push('/(auth)/signup3');
  };

  const handleNext = async () => {
    if (!inputNameValue) {
      setError('El nombre es requerido');
      return;
    }
    if (!inputLastNameValue) {
      setError('El apellido es requerido');
      return;
    }
    if (!inputCUILValue) {
      setError('El CUIL es requerido');
      return;
    }
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    await updateFirstData({
      first_name: inputNameValue,
      last_name: inputLastNameValue,
      cuil: inputCUILValue,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };

  useEffect(() => {
    setInputNameValue(user?.first_name || '');
    setInputLastNameValue(user?.last_name || '');
    setInputCUILValue(user?.cuil || '');
  }, [user]);

  if (!isAuth) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
        <View style={styles.logoContainer}>
          <Image source={images.logo_blue} style={styles.logo} />
        </View>
        <Text style={styles.title}>Registro</Text>
        <CustomProgressBar currentStep={1} totalSteps={3} />
        <TextInput
          placeholder="Nombre"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleNameFocus}
          onBlur={handleNameBlur}
          onChangeText={text => setInputNameValue(text)}
          value={inputNameValue}
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: nameIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        <TextInput
          placeholder="Apellido"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleLastNameFocus}
          onBlur={handleLastNameBlur}
          value={inputLastNameValue}
          onChangeText={text => setInputLastNameValue(text)}
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: lastNameIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        <TextInput
          placeholder="CUIL"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleCUILFocus}
          onBlur={handleCUILBlur}
          value={inputCUILValue}
          onChangeText={text => setInputCUILValue(text)}
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: cUILIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleNext}>
            {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
            {!isSubmitting && <Text style={styles.textNext}>Siguiente</Text>}
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
  containerNext: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.blue2,
    fontSize: 32,
    textAlign: 'center',
    marginTop: 45,
    marginBottom:20
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
    marginTop:30
  },
  error: {
    fontFamily: fonts.gotham.regular,
    color: colors.red,
    textAlign: 'center',
    marginTop: 20
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:38
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
});

export default SignUp2;
