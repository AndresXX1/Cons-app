import { useState } from 'react';
import { View, StyleSheet, Pressable, Text, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '@/theme';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { forgetPassword } from '@/store/actions/auth';

const PinVerification = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [data, setData] = useState({
    email: '',
  });

  const handleNext = async () => {
    if (!data.email) {
      setError('Introduzca un Email');
      return;
    }

    setIsSubmitting(true);

    dispatch(forgetPassword({ data, setActive, setError, dispatch }))
      .then(() => {
        router.push({ pathname: '/(auth)/forget_password' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleEmailFocus = () => {
    setEmailIsFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailIsFocused(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          onChangeText={text => setData({ ...data, email: text })}
          editable={!isSubmitting}
          value={data.email}
          style={[
            styles.textInput,
            {
              borderColor: emailIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNextBlue} onPress={handleNext} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size={22} color={colors.white} />
            ) : (
              <Text style={styles.textNextWhite}>Siguiente</Text>
            )}
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
    marginTop: 30,
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
    marginTop: 42,
    marginBottom: 20,
  },
  textPinTwo: {
    color: colors.gray2,
    fontFamily: fonts.gotham.regular,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 40,
    lineHeight: 20,
  },
  textOpacity: {
    fontFamily: fonts.gotham.semiBold,
  },
});

export default PinVerification;
