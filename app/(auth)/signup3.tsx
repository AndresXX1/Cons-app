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
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CustomProgressBar from '@/components/CustomProgressBar';
import { colors, fonts, images } from '@/theme';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateSecondData } from '@/store/service/user';

import * as ImagePicker from 'expo-image-picker';

interface ImageProps {
  uri: string,
  filename: string,
}

const formatDateString = (date: Date) => {
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateText, setSelectedDateText] = useState<string>('');

  // Estado para almacenar la imagen de perfil
  const [profileImage, setProfileImage] = useState<ImageProps | null>(null);

  const formatDateString = (date: Date) => {
    return new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

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

  const cancelDatePicker = () => {
    setShowPicker(false);
    setSelectedDateText('');
  };


  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedDateText(formatDateString(date));
    } else if (event.type === 'dismissed') {
      // Si el usuario cancela el selector, no hacemos nada
    }
    if (Platform.OS === 'android') {
      setShowPicker(false); // Oculta el DatePicker en Android después de seleccionar o cancelar
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
    const newImage = new FormData()
    if (profileImage) {
      const blob = await fetch(profileImage.uri).then(res => res.blob());
      newImage.append('file', blob, profileImage.filename)
    }
    setIsSubmitting(true);
    await updateSecondData({
      birthday: selectedDate,
      phone: inputPhoneValue,
      newImage,
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
      flashMode: 'off', // Desactivar el modo de flash
      facing: 'front', 
      flash: 'off',
      cameraType: ImagePicker.CameraType.front, // Usar la cámara frontal
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      if (selectedImage.fileName) {
        setProfileImage({uri: selectedImage.uri, filename: selectedImage.fileName});
      }
    }
  };

  if (!isAuth) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.logoContainer}>
            <Image source={images.logo_blue} style={styles.logo} />
          </View>
          <Text style={styles.title}>Registro</Text>
          <CustomProgressBar currentStep={3} totalSteps={4} />

          <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
            <TextInput
              placeholder="Fecha de nacimiento"
              style={styles.textInput}
              value={selectedDateText}
              editable={false}
              pointerEvents="none"
              onPressIn={showDatePicker}
            />
          </TouchableOpacity>

          {error !== '' && <Text style={styles.error}>{error}</Text>}

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

          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
            ) : (
              <Image source={images.placeholderProfile} style={styles.profileImage} />
            )}
          </View>

          <Pressable onPress={handleTakePhoto} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Subir foto de perfil (opcional)</Text>
          </Pressable>

          <View style={styles.containerNext}>
            <Pressable style={styles.buttonNext} onPress={handleNext}>
              {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
              {!isSubmitting && <Text style={styles.textNext}>Finalizar registro</Text>}
            </Pressable>
          </View>
        </View>

        {showPicker && Platform.OS === 'ios' && (
          <Modal visible={showPicker} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DatePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  textColor={colors.black}
                  locale="es-AR"

                />
                <Pressable onPress={hideDatePicker}>
                  {({ pressed }) => (
                    <View style={[styles.buttonSave, { opacity: pressed ? 0.5 : 1 }]}>
                      <Text style={styles.textSave}>Confirmar</Text>
                    </View>
                  )}
                </Pressable>
                <Pressable onPress={cancelDatePicker}>
                  {({ pressed }) => (
                    <View style={[styles.buttonClose, { opacity: pressed ? 0.5 : 1 }]}>
                      <Text style={styles.textClose}>Cancelar</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </Modal>
        )}

        {showPicker && Platform.OS === 'android' && (
          <DatePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            locale="es-AR"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 52,
    paddingHorizontal: 16,
  },
  form: {
    flex: 1,
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
    justifyContent: 'center',
  },
  error: {
    fontFamily: fonts.gotham.regular,
    color: colors.red,
    textAlign: 'center',
    marginTop: 10,
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
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonSave: {
    marginTop: 10,
    backgroundColor: colors.blue,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderBlockColor: colors.blue,
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: colors.blue,
    borderWidth: 1,
  },
  textClose: {
    color: colors.blue,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textSave: {
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
