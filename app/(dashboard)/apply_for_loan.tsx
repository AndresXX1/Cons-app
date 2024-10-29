import React, { useRef, useState } from 'react';
import { colors, fonts, images } from '@/theme';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ApplyForLoanScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const { user, smarter } = useSelector((state: RootState) => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const branches = [
    { id: 'VARELAAPP', name: 'Florencio Varela' },
    { id: 'SOLANOAPP', name: 'San Francisco Solano' },
    { id: 'SANFERNANDOAPP', name: 'San Fernando' },
    { id: 'BERAZATEGUIAPP', name: 'Berazategui' },
    { id: 'SANJUSTOAPP', name: 'San Justo' },
    { id: 'LANUSAPP', name: 'Lanus' },
    { id: 'LOMASAPP', name: 'Lomas' },
    { id: 'SANMIGUEL2APP', name: 'San Miguel 2' },
    { id: 'AVELLANEDAAPP', name: 'Avellaneda' },
    { id: 'ONLINEAPP', name: 'Online' },
    { id: 'QUILMESAPP', name: 'Quilmes' },
    { id: 'SANJOSEAPP', name: 'San Jose' },
    { id: 'LINIERSAPP', name: 'Liniers' },
    { id: 'LAFERREREAPP', name: 'Laferrere' },
    { id: 'MORENOAPP', name: 'Moreno' },
    { id: 'DHOGARAPP', name: 'Dulce Hogar' },
    { id: 'GRANDULCEAPP', name: 'La Gran Dulce' },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>Quiero Mi Préstamo</Text>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={['#F3E670', '#FFBA08']}
            style={styles.gradientBorder}>
            <View style={styles.containerLoan}>
              <Text style={styles.textLoan}>
                Préstamo disponible de{'\n'}
                <Text style={styles.textPriceLoan}>$300.000</Text>
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.buttonRed}>
            <Pressable onPress={() => openModal()}>
              <Text style={styles.textRed}>¡LO QUIERO AHORA!</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => openModal()}>
            <Text style={styles.textBlue}>Ver otras opciones</Text>
          </Pressable>
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <View style={styles.containerModal}>
                  <Text style={styles.textSurcursal}>¿En que sucursal te encontrás?</Text>
                  <Pressable onPress={closeModal}>
                    <Image source={images.x_modal} style={styles.imgX} />
                  </Pressable>
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                    style={styles.inputSearch}
                    placeholder="Escribe el nombre de sucursal..."
                    placeholderTextColor={colors.gray2}
                  />
                </View>
                <View style={styles.containerLoca}>
                  <ScrollView style={styles.scrollView} ref={scrollViewRef}>
                    {branches.map((branch, index) => {
                      return (
                        <View key={index}>
                          <View style={styles.containerLocation}>
                            <Image source={images.location} />
                            <Text style={styles.textLocation}>{branch.name}</Text>
                          </View>
                          <View style={styles.line}></View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>

                <View style={styles.surcursalButton}>
                  <Text style={styles.textSurcur}>No me encuentro en una sucursal</Text>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  back: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnBack: {
    display: 'flex',
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
    marginVertical: 24,
  },
  arrow: {
    width: 14,
    height: 24,
  },
  btnBackText: {
    color: colors.blue,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 40,
  },
  containerLoan: {
    backgroundColor: colors.blue2,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 6,
    maxHeight: 140,
    borderRadius: 10,
    width: 330,
    marginHorizontal: 'auto',
  },
  textLoan: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  textPriceLoan: {
    fontSize: 42,
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    lineHeight: 48,
  },
  textShare: {
    marginTop: 32,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    color: colors.texts,
    textAlign: 'center',
    marginBottom: 100,
  },
  textShareSpan: {
    fontFamily: fonts.gotham.regular,
  },
  buttonRed: {
    backgroundColor: '#E74D3E',
    height: 54,
    width: 328,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginTop: 100,
  },
  textRed: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  textBlue: {
    color: colors.blue,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 25,
    fontFamily: fonts.gotham.semiBold,
    borderBottomWidth: 1,
    marginHorizontal: 'auto',
    borderBottomColor: colors.blue,
    marginBottom: 40,
  },
  textFinally: {
    color: colors.texts,
    fontSize: 15,
    fontFamily: fonts.gotham.regular,
    lineHeight: 19,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  notEligibleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: -40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  notEligibleText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.texts,
    marginBottom: 40,
    fontFamily: fonts.gotham.regular,
    paddingHorizontal: 10,
  },
  boldText: {
    fontFamily: fonts.gotham.bold,
  },
  contactButton: {
    backgroundColor: '#E74D3E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.gotham.bold,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
  },
  containerModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textSurcursal: {
    color: colors.texts,
    fontSize: 16,
    fontFamily: fonts.gotham.bold,
    fontWeight: '400',
  },
  imgX: {
    width: 24,
    height: 24,
  },
  containerLoca: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20,
    maxHeight: 190,
    overflow: 'hidden',
  },
  containerLocation: {
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
    width: 'auto',
    alignItems: 'center',
  },
  line: {
    width: 280,
    height: 1,
    backgroundColor: colors.texts,
    marginVertical: 20,
    marginRight: 15,
  },
  textLocation: {
    fontSize: 14,
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
    fontWeight: '700',
  },
  surcursalButton: {
    backgroundColor: colors.blue2,
    height: 41,
    width: 290,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSurcur: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '400',
  },
  inputSearch: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: colors.white,
    paddingLeft: 8,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.texts,
    width: 290,
  },
});

export default ApplyForLoanScreen;
