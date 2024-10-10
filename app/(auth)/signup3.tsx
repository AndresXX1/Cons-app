import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CustomProgressBar from '@/components/CustomProgressBar';
import { colors, fonts, images } from '@/theme';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateSecondData } from '@/store/service/user';

const formatDateString = (date: string) => {
  const spaceIndex = date.indexOf(' ');
  const secondSpaceIndex = date.indexOf(' ', spaceIndex + 1);
  const month =
    date.slice(secondSpaceIndex + 1, secondSpaceIndex + 2).toUpperCase() +
    date.slice(secondSpaceIndex + 2);
  return date.slice(0, secondSpaceIndex + 1) + month;
};

const SignUp3 = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [inputPhoneValue, setInputPhoneValue] = useState('');
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateText, setSelectedDateText] = useState<string>('');

  const routerNext = () => {
    router.push('/(auth)/signup4');
  };

  const handlePhoneFocus = () => {
    setPhoneIsFocused(true);
  };

  const handlePhoneBlur = () => {
    setPhoneIsFocused(false);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('es', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(selectedDate);
      hideDatePicker();
      setSelectedDate(selectedDate);
      setSelectedDateText(formatDateString(formattedDate));
    }
  };

  const handleNext = async () => {
    if (!selectedDate) {
      setError('Fecha de nacimiento requerida');
      return;
    }
    if (!inputPhoneValue) {
      setError('El telefono es requerido');
      return;
    }
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    await updateSecondData({
      birthday: selectedDate,
      phone: inputPhoneValue,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };

  useEffect(() => {
    if (user?.birthday) {
      const date = new Date(user.birthday.toString());
      const formattedDate = new Intl.DateTimeFormat('es', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
      setSelectedDate(date);
      setSelectedDateText(formatDateString(formattedDate));
    }
    setInputPhoneValue(user?.phone || '');
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
        <CustomProgressBar currentStep={3} totalSteps={4} />

        <TouchableOpacity style={{ opacity: 1 }} activeOpacity={1} onPress={showDatePicker}>
          <TextInput
            placeholder="Fecha de nacimiento"
            style={styles.textInput}
            value={selectedDateText}
            editable={false}
          />
        </TouchableOpacity>
        {showPicker && (
          <DatePicker
            style={{
              backgroundColor: colors.darkPurple,
            }}
            value={selectedDate}
            display="spinner"
            mode="date"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          placeholder="Teléfono"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handlePhoneFocus}
          onBlur={handlePhoneBlur}
          onChangeText={text => setInputPhoneValue(text)}
          editable={!isSubmitting}
          value={inputPhoneValue}
          style={[
            styles.textInput,
            {
              borderColor: phoneIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleNext}>
            {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
            {!isSubmitting && <Text style={styles.textNext}>Finalizar registro</Text>}
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
    verticalAlign: 'middle',
    textAlign: 'center',
    marginTop: 45,
    marginBottom:20
  },
  textInput: {
    color: colors.black,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    height: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
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
    marginTop:52
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
  input: {
    backgroundColor: colors.transparent,
    height: 50,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 26,
    lineHeight: 29.12,
    letterSpacing: -0.26,
  },
});

export default SignUp3;

