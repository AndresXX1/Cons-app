import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomProgressBar from '@/components/CustomProgressBar';
import { colors, fonts, images } from '@/theme';
import { useRouter } from 'expo-router';

const SignUp2 = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputNameValue, setInputNameValue] = useState('');
  const [nameIsFocused, setNameIsFocused] = useState(false);

  const [inputLastNameValue, setInputLastNameValue] = useState('');
  const [lastNameIsFocused, setLastNameIsFocused] = useState(false);

  const [inputCUILValue, setInputCUILValue] = useState('');
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

  const handleNext = () => {
    router.push('signup3');
  };

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
        <TextInput
          placeholder="CUIL"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handleCUILFocus}
          onBlur={handleCUILBlur}
          onChangeText={text => setInputCUILValue(text)}
          editable={!isSubmitting}
          style={[
            styles.textInput,
            {
              borderColor: cUILIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleNext}>
            <Text style={styles.textNext}>Siguiente</Text>
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
    fontWeight: '400',
    height: 48,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
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
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
});

export default SignUp2;
