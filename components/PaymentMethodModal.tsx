// PaymentMethodModal.tsx
import { colors, fonts, images } from '@/theme';
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';

interface PaymentMethodModalProps {
  isVisible: boolean;
  methodIndex: number | null; // Índice del método de pago seleccionado
  onClose: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isVisible,
  methodIndex,
  onClose,
}) => {
  if (methodIndex === null) return null;

  let modalContent = { title: '', description: '' };

  switch (methodIndex) {
    case 0:
      modalContent = {
        title: 'Pago en línea',
        description:
          'Para abonar la cuota de tu préstamo escanea el QR desde tu billetera virtual favorita y luego ingresá el monto a pagar.',
      };
      break;
    case 1:
      modalContent = {
        title: 'Pago fácil',
        description: 'Realiza el pago de manera fácil y rápida desde nuestra app.',
      };
      break;
    case 2:
      modalContent = {
        title: 'Mercado Pago',
        description: 'Utiliza Mercado Pago ',
      };
      break;
    case 3:
      modalContent = {
        title: 'Transferencia o depósito',
        description: 'Utiliza Mercado Pago para abonar tu cuota rápidamente.',
      };
      break;
    case 4:
      modalContent = {
        title: 'Rapi Pago',
        description: 'Utiliza Mercado Pago para abonar tu cuota rápidamente.',
      };
      break;
    case 5:
      modalContent = {
        title: 'Billetera virtual',
        description: 'Utiliza Mercado Pago para abonar tu cuota rápidamente.',
      };
      break;
    case 6:
      modalContent = {
        title: 'Consultá tu cuenta',
        description: 'Utiliza Mercado Pago para abonar tu cuota rápidamente.',
      };
      break;
    default:
      modalContent = {
        title: 'Sucursal',
        description: 'Información no disponible.',
      };
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.containerModal}>
            <Text style={styles.textSurcursal}>{modalContent.title}</Text>
            <Pressable onPress={onClose}>
              <Image source={images.x_modal} style={styles.imgX} />
            </Pressable>
          </View>
          <Text style={styles.description}>{modalContent.description}</Text>
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
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  methodImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  containerModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 11,
  },
  textSurcursal: {
    color: colors.texts,
    fontSize: 18,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
  },
  imgX: {
    width: 24,
    height: 24,
  },
});

export default PaymentMethodModal;
