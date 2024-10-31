// SelectBranchModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Image,
  TextInput,
  ActivityIndicator, // Importar ActivityIndicator
} from 'react-native';
import { colors, fonts, images } from '@/theme';

interface Branch {
  id: string;
  name: string;
}

interface SelectBranchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectBranch: (branchId: string) => void;
  branches: Branch[];
  isLoading: boolean; // Nuevo prop
}

const SelectBranchModal: React.FC<SelectBranchModalProps> = ({
  visible,
  onClose,
  onSelectBranch,
  branches,
  isLoading,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>(branches);

  useEffect(() => {
    const filtered = branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBranches(filtered);
  }, [searchText, branches]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Loader Overlay */}
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color={colors.blue} />
              <Text style={styles.loaderText}>Procesando tu solicitud...</Text>
            </View>
          )}
          <View style={styles.header}>
            <Text style={styles.title}>¿En qué sucursal te encontrás?</Text>
            <Pressable onPress={onClose} disabled={isLoading}>
              <Image source={images.x_modal} style={styles.imgX} />
            </Pressable>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputSearch}
              placeholder="Escribe el nombre de sucursal..."
              placeholderTextColor={colors.gray2}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              editable={!isLoading} // Deshabilitar la edición mientras carga
            />
          </View>
          <View style={styles.listContainer}>
            <ScrollView style={styles.modalScrollView}>
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => (
                  <View key={branch.id}>
                    <Pressable
                      onPress={() => onSelectBranch(branch.id)}
                      disabled={isLoading} // Deshabilitar mientras carga
                    >
                    {({ pressed }) => (
                      <View style={[styles.branchItem, { opacity: pressed ? 0.2 : 1 }, { backgroundColor: pressed ? colors.gray5 : 'transparent'}]}>
                        <Image source={images.location} style={styles.locationIcon} />
                        <Text style={styles.branchName}>{branch.name}</Text>
                      </View>
                      )}
                    </Pressable>
                    <View style={styles.line}></View>
                  </View>
                ))
              ) : (
                <Text style={styles.noResultsText}>No se encontraron sucursales.</Text>
              )}
            </ScrollView>
          </View>
          <Pressable
            style={styles.noBranchButton}
            onPress={() => {
              onSelectBranch('ONLINEAPP'); // Asumiendo que 'ONLINEAPP' representa la opción "No me encuentro en una sucursal"
            }}
            disabled={isLoading} // Deshabilitar mientras carga
          >
            {({ pressed }) => (
            <Text style={[styles.noBranchText, { opacity: pressed ? 0.5 : 1 }]}>No me encuentro en una sucursal</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 10,
    position: 'relative', // Para posicionar el loader overlay
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 1,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.texts,
    fontSize: 16,
    fontFamily: fonts.gotham.bold,
  },
  imgX: {
    width: 24,
    height: 24,
  },
  searchContainer: {
    marginTop: 25,
    marginBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray4,
    paddingVertical: 5,
  },
  inputSearch: {
    height: 40,
    paddingLeft: 8,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
    color: colors.texts,
  },
  listContainer: {
    width: '100%',
    maxHeight: 190,
    marginTop: 10,
  },
  modalScrollView: {
    width: '100%',
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 2,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  branchName: {
    fontSize: 14,
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
    marginLeft: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray2,
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 14,
    marginTop: 20,
  },
  noBranchButton: {
    backgroundColor: colors.blue2,
    height: 41,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  noBranchText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.gotham.semiBold,
  },
});

export default SelectBranchModal;
