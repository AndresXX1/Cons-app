import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { colors, fonts } from '@/theme';
import { useRef, useState } from 'react';
import { updateUserNameAndLastName } from '@/store/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { router } from 'expo-router';

const EditName = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [error, setError] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputLastNameValue, setInputLastNameValue] = useState('');

  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [lastNameIsFocused, setLastNameIsFocused] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(inputNameValue, inputLastNameValue);

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

  const routerNext = () => {
    router.push('/my_data');
  };

  const handleSave = async () => {
    if (!inputNameValue) {
      setError('El nombre es requerido');
      return;
    }
    if (!inputLastNameValue) {
      setError('El apellido es requerido');
      return;
    }
    if (isSubmitting) {
      return;
    }

    const userId = user?.id || '';
    setIsSubmitting(true);

    await updateUserNameAndLastName({
      id: userId,
      first_name: inputNameValue,
      last_name: inputLastNameValue,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
        <View style={styles.contentContainer}>
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
        </View>

        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleSave}>
            {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
            {!isSubmitting && <Text style={styles.textNext}>Guardar</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 70,
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
    marginTop: 30,
  },
  containerNext: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
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
    marginTop: 38,
  },
});

export default EditName;
