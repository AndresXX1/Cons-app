import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { colors, fonts } from '@/theme';
import { updateUserData } from '@/store/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { router } from 'expo-router';

const EditBirthdate = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState<string>('');

  const formatDateString = (date: Date) => {
    return new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const routerNext = () => {
    router.push('/my_data');
  };

  const showDatePickerHandler = () => {
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
    }
    if (Platform.OS === 'android') {
      setShowPicker(false); // Hide the DatePicker on Android after selection
    }
  };

  const handleSave = async () => {
    if (!selectedDate) {
      setError('La fecha de nacimiento es requerida');
      return;
    }
    if (isSubmitting) {
      return;
    }

    const userId = user?.id || '';
    setIsSubmitting(true);

    try {
      await updateUserData({
        id: userId,
        birthday: selectedDate,
        setError,
        setIsSubmitting,
        dispatch,
        routerNext,
      });
    } catch (err) {
      setError('Error al guardar la fecha de nacimiento');
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}>
        <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />

        <TouchableOpacity onPress={showDatePickerHandler} activeOpacity={0.7}>
          <TextInput
            placeholder="Fecha de nacimiento"
            placeholderTextColor={colors.gray2}
            style={styles.textInput}
            value={selectedDateText}
            editable={false}
            pointerEvents="none"
            onPressIn={showDatePickerHandler}
            accessibilityLabel="Seleccionar fecha de nacimiento"
          />
        </TouchableOpacity>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={styles.containerNext}>
          <Pressable onPress={handleSave} disabled={isSubmitting}>
            {({ pressed }) => (
              <View style={[styles.buttonNext, { opacity: pressed ? 0.5 : 1 }]}>
                {isSubmitting ? (
                  <ActivityIndicator size={22} color={colors.white} />
                ) : (
                  <Text style={styles.textNext}>Guardar</Text>
                )}
              </View>
            )}
          </Pressable>
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
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 70,
    paddingBottom: 20, // Ensure content is not hidden behind the button
  },
  scrollView: {
    flexGrow: 1,
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
    marginTop: 30,
    justifyContent: 'center',
  },
  containerNext: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textNext: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 16,
  },
  buttonNext: {
    backgroundColor: colors.blue,
    width: 164,
    height: 50,
    borderRadius: 25, // Changed to 25 for perfect rounding
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

export default EditBirthdate;
