import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, TextInput, TouchableOpacity, Modal, ActivityIndicator, Platform } from 'react-native';
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

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const [selectedDateText, setSelectedDateText] = useState<string>('');

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) {
      setSelectedDate(date);
      setSelectedDateText(formatDateString(date));
    }
    if (Platform.OS === 'android') {
      setShowPicker(false); // Oculta el DatePicker en Android después de seleccionar
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

    await updateUserData({
      id: userId,
      birthday: selectedDate,
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
        </View>

        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <View style={styles.containerNext}>
          <Pressable style={styles.buttonNext} onPress={handleSave}>
            {isSubmitting && <ActivityIndicator size={22} color={colors.white} />}
            {!isSubmitting && <Text style={styles.textNext}>Guardar</Text>}
          </Pressable>
        </View>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Para mostrar el modal en la parte inferior
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textClose: {
    color: 'white',
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
