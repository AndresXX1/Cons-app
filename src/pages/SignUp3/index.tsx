import { colors, fonts } from '@theme';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { images } from 'src/theme/images';
// import { logInAsync } from '../../store/actions/auth';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import CustomProgressBar from '@components/CustomProgressBar';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface SignUp3Props {
  navigation?: any;
  route?: any;
}

const formatDateString = (date: string) => {
  const spaceIndex = date.indexOf(' ');
  const secondSpaceIndex = date.indexOf(' ', spaceIndex + 1);
  const month =
    date.slice(secondSpaceIndex + 1, secondSpaceIndex + 2).toUpperCase() +
    date.slice(secondSpaceIndex + 2);
  return date.slice(0, secondSpaceIndex + 1) + month;
};

const SignUp3 = ({ route, navigation }: SignUp3Props) => {
  const { email, password, name, lastName, cuil } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputNameValue, setInputNameValue] = useState('');
  const [nameIsFocused, setNameIsFocused] = useState(false);

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateText, setSelectedDateText] = useState<string>('');

  const [inputLastNameValue, setInputLastNameValue] = useState('');
  const [lastNameIsFocused, setLastNameIsFocused] = useState(false);

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
  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long' }).format(
        selectedDate,
      );
      hideDatePicker();
      setSelectedDate(selectedDate);
      setSelectedDateText(formatDateString(formattedDate));
    }
  };

  const handleNext = () => {
    navigation.navigate('SignUp3', {
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      cuil: cuil,
    });
  };

  return (
    <View style={styles.root}>
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
          placeholder="Nombre"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleNameFocus}
          onBlur={handleNameBlur}
          onChangeText={text => setInputNameValue(text)}
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
          onChangeText={text => setInputLastNameValue(text)}
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: lastNameIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        <View style={styles.containerNext}>
          <Pressable onPress={handleNext}>
            <Text style={styles.buttonNext}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 36,
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
  textInput: {
    color: colors.black,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    fontWeight: '400',
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
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
