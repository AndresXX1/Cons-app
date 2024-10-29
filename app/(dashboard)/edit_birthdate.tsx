import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { colors, fonts } from '@/theme';
import { useRef, useState } from 'react';
import { updateUserData } from '@/store/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { router } from 'expo-router';

const EditBirthdate = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [error, setError] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateString = (date: string) => {
    const spaceIndex = date.indexOf(' ');
    const secondSpaceIndex = date.indexOf(' ', spaceIndex + 1);
    const month =
      date.slice(secondSpaceIndex + 1, secondSpaceIndex + 2).toUpperCase() +
      date.slice(secondSpaceIndex + 2);
    return date.slice(0, secondSpaceIndex + 1) + month;
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

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = new Intl.DateTimeFormat('es', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(selectedDate);
      setSelectedDate(selectedDate);
      setSelectedDateText(formatDateString(formattedDate));
    }
  };

  const handleSave = async () => {
    if (!selectedDate) {
      setError('El nombre es requerido');
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
          <TouchableOpacity style={{ opacity: 1 }} activeOpacity={1}>
            <TextInput
              onPress={showDatePicker}
              placeholder="Fecha de nacimiento"
              style={styles.textInput}
              value={selectedDateText}
              editable={false}
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

        <Modal visible={showPicker} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DatePicker
                style={{ width: '100%' }}
                value={selectedDate}
                display="spinner"
                mode="date"
                textColor="#000"
                onChange={handleDateChange}
              />
              <Pressable style={styles.buttonClose} onPress={hideDatePicker}>
                <Text style={styles.textClose}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
  },
  textClose: {
    color: 'white',
    width: 100,
    display: 'flex',
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    height: 18,
    paddingTop: 3,
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

export default EditBirthdate;
