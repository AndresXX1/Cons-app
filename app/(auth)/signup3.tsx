import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  Platform,
  Alert,
} from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CustomProgressBar from '@/components/CustomProgressBar';
import { colors, fonts, images } from '@/theme';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateSecondData } from '@/store/service/user';

// Importar ImagePicker desde expo-image-picker
import * as ImagePicker from 'expo-image-picker';

const formatDateString = (date: string | Date) => {
  if (typeof date === 'string') {
    const [day, month, year] = date.split('/');
    return `${day}/${month}/${year}`;
  } else {
    const formattedDate = new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  }
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateText, setSelectedDateText] = useState<string>('');

  // Estado para almacenar la imagen de perfil
  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedDateText(formatDateString(date));
    }
    if (Platform.OS === 'android') {
      setShowPicker(false); // Oculta el DatePicker en Android después de seleccionar
    }
  };

  const handleNext = async () => {
    if (!selectedDateText) {
      setError('Fecha de nacimiento requerida');
      return;
    }
    if (!inputPhoneValue) {
      setError('El teléfono es requerido');
      return;
    }
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    await updateSecondData({
      birthday: selectedDate,
      phone: inputPhoneValue,
      // Puedes incluir profileImage si planeas enviarlo al backend
      // profileImage,
      setError,
      setIsSubmitting,
      dispatch,
      routerNext,
    });
  };

  useEffect(() => {
    if (user?.birthday) {
      const date = new Date(user.birthday.toString());
      const formattedDate = formatDateString(date);
      setSelectedDate(date);
      setSelectedDateText(formattedDate);
    }
    setInputPhoneValue(user?.phone || '');
  }, [user]);

  // Función para manejar la toma de la foto
  const handleTakePhoto = async () => {
    // Solicitar permisos de cámara
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos permiso para usar la cámara');
      return;
    }

    // Abrir la cámara para tomar una foto
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite al usuario editar la foto
      aspect: [1, 1], // Relación de aspecto cuadrada
      quality: 0.7, // Calidad de la imagen
      cameraType: 'front', // Usar la cámara frontal
      FlashMode: 'off', // Desactivar el modo de flash
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setProfileImage(selectedImage.uri);
    }
  };

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

        <TextInput
          placeholder="Fecha de nacimiento"
          style={styles.textInput}
          value={selectedDateText}
          editable={false}
          placeholderTextColor={colors.gray2}
          onPressIn={showDatePicker}
        />

        {showPicker && (
          <Modal visible={showPicker} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DatePicker
                  value={selectedDate || new Date()}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  mode="date"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  locale="es-ES"
                  textColor="#000"
                />
                {Platform.OS === 'ios' && (
                  <Pressable style={styles.buttonClose} onPress={hideDatePicker}>
                    <Text style={styles.textClose}>Confirmar</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </Modal>
        )}

        <TextInput
          placeholder="Teléfono"
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          onFocus={handlePhoneFocus}
          onBlur={handlePhoneBlur}
          onChangeText={(text) => setInputPhoneValue(text)}
          editable={!isSubmitting}
          value={inputPhoneValue}
          style={[
            styles.textInput,
            {
              borderColor: phoneIsFocused ? colors.blue2 : colors.gray2,
            },
          ]}
        />

        {/* Mostrar la imagen de perfil o un marcador de posición */}
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={images.placeholderProfile} style={styles.profileImage} />
          )}
        </View>

        <Pressable onPress={handleTakePhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Subir foto de perfil (opcional)</Text>
        </Pressable>

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
  form: {
    paddingHorizontal: 16,
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
  title: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.blue2,
    fontSize: 32,
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 20,
  },
  textInput: {
    color: colors.black,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    height: 56,
    borderColor: colors.gray2,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  error: {
    fontFamily: fonts.gotham.regular,
    color: colors.red,
    textAlign: 'center',
    marginTop: 20,
  },
  containerNext: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Para mostrar el modal en la parte inferior
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10, // Para un mejor diseño
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
  },
  textClose: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    fontSize: 16,
  },
  // Estilos para la imagen de perfil y el botón de subir
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: colors.blue,
    fontFamily: fonts.gotham.regular,
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SignUp3;
