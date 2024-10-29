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
import { updateUserData } from '@/store/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { router } from 'expo-router';

const EditCuil = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputCUILValue, setInputCUILValue] = useState(user?.cuil || '');
  const [cUILIsFocused, setCUILIsFocused] = useState(false);

  const handleCUILFocus = () => {
    setCUILIsFocused(true);
  };

  const handleCUILBlur = () => {
    setCUILIsFocused(false);
  };

  const routerNext = () => {
    router.push('/my_data');
  };

  const handleSave = async () => {
    if (!inputCUILValue) {
      setError('El cuil es requerido');
      return;
    }
    if (isSubmitting) {
      return;
    }

    const userId = user?.id || '';
    setIsSubmitting(true);

    await updateUserData({
      id: userId,
      cuil: inputCUILValue,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
        <View style={styles.contentContainer}>
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
        </View>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
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
  error: {
    fontFamily: fonts.gotham.regular,
    color: colors.red,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditCuil;
