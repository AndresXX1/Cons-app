import React, { useRef, useState, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { applyForLoan } from '@/store/service/user';


const ApplyForLoanScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const { user, smarter } = useSelector((state: RootState) => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, [])
  );

  const handlePush = async (branchName: string) => {
    await applyForLoan(branchName)
    closeModal();
    router.push(`/borrow_money`);
  }

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

    // 1. Estado para el texto de búsqueda
    const [searchText, setSearchText] = useState('');

    // 2. Función para filtrar las sucursales
    const filteredBranches = branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchText.toLowerCase())
    );

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
              <Pressable onPress={openModal}>
                <Text style={styles.textRed}>¡LO QUIERO AHORA!</Text>
              </Pressable>
            </View>
            <Pressable onPress={openModal}>
              <Text style={styles.textBlue}>Ver otras opciones</Text>
            </Pressable>
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
              <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                  <View style={styles.containerModal}>
                    <Text style={styles.textSurcursal}>¿En qué sucursal te encontrás?</Text>
                    <Pressable onPress={closeModal}>
                      <Image source={images.x_modal} style={styles.imgX} />
                    </Pressable>
                  </View>
                  <View style={styles.containerInput}>
                    <TextInput
                      style={styles.inputSearch}
                      placeholder="Escribe el nombre de sucursal..."
                      placeholderTextColor={colors.gray2}
                      value={searchText}
                      onChangeText={(text) => setSearchText(text)}
                    />
                  </View>
                  <View style={styles.containerLoca}>
                    <ScrollView style={styles.modalScrollView}>
                      {filteredBranches.length > 0 ? (
                        filteredBranches.map((branch, index) => (
                          <View key={index}>
                            <Pressable
                              onPress={() => {
                                handlePush(branch.id)
                              }}>
                              <View style={styles.containerLocation}>
                                <Image source={images.location} />
                                <Text style={styles.textLocation}>{branch.name}</Text>
                              </View>
                            </Pressable>
                            <View style={styles.line}></View>
                          </View>
                        ))
                      ) : (
                        // 4. Mostrar mensaje si no hay resultados
                        <Text style={styles.noResultsText}>No se encontraron sucursales.</Text>
                      )}
                    </ScrollView>
                  </View>
                  <Pressable
                    style={styles.surcursalButton}
                    onPress={() => {
                      closeModal(); // Cierra el modal antes de navegar
                      router.push(`/borrow_money`);
                    }}>
                    <Text style={styles.textSurcur}>No me encuentro en una sucursal</Text>
                  </Pressable>
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
  noResultsText: {
    textAlign: 'center',
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
    marginTop: 20,
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
    alignItems: 'center', // Asegúrate de centrar el contenido si es necesario
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
    alignSelf: 'center', // Centra el componente horizontalmente
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
  buttonRed: {
    backgroundColor: '#E74D3E',
    height: 54,
    width: 328,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Centra el botón horizontalmente
    marginTop: 100,
  },
  textRed: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    textTransform: 'capitalize',
  },
  textBlue: {
    color: colors.blue,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 25,
    fontFamily: fonts.gotham.semiBold,
    borderBottomWidth: 1,
    alignSelf: 'center', // Centra el texto horizontalmente
    borderBottomColor: colors.blue,
    marginBottom: 40,
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
    // alignItems: 'center', // Removido para evitar centrar horizontalmente todo el contenido
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textSurcursal: {
    color: colors.texts,
    fontSize: 16,
    fontFamily: fonts.gotham.bold,
  },
  imgX: {
    width: 24,
    height: 24,
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
    width: '100%', // Asegurar que ocupe el ancho completo
  },
  inputSearch: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: colors.white,
    paddingLeft: 8,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
  },
  containerLoca: {
    width: '100%',
    marginTop: 20,
    maxHeight: 190,
  },
  modalScrollView: {
    width: '100%',
  },
  containerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,

  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.texts,
    marginVertical: 10,
  },
  textLocation: {
    fontSize: 14,
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
    marginLeft: 10,
  },
  surcursalButton: {
    backgroundColor: colors.blue2,
    height: 41,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  textSurcur: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.gotham.semiBold,
  },
});

export default ApplyForLoanScreen;
