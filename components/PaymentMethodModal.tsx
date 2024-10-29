// PaymentMethodModal.tsx
import { colors, fonts, images } from '@/theme';
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Image } from 'react-native';

interface PaymentMethodModalProps {
  isVisible: boolean;
  methodIndex: number | null;
  onClose: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isVisible,
  methodIndex,
  onClose,
}) => {
  if (methodIndex === null) return null;

  let modalContent = {
    title: '',
    description: '',
    description2: '',
    description3: '',
    description4: '',
  };

  switch (methodIndex) {
    case 0:
      modalContent = {
        title: 'Pago en línea',
        description:
          'Para abonar la cuota de tu préstamo por pago en línea debes comunicarte al 0800 - 220 - 2743 opción 2 con el sector de atención al cliente.',
        description2: 'Ahí uno de nuestros operadores atenderá tu llamado para que puedas abonar',
        description3:
          'Vas a tener que indicar tu DNI y con tu tarjeta de débito vas a poder realizar el pago',
        description4: '',
      };
      break;
    case 1:
      modalContent = {
        title: 'Pago fácil',
        description:
          'Para abonar la cuota de tu préstamo en efectivo deberás asistir de manera presencial a cualquier sucursal de Pago Fácil y realizar un pago abierto a empresa sin factura a nombre de Argencred S.A o Argenpesos indicando tu DNI.',
        description2:
          'Ingresá a https://www.pagofacil.com.ar/ para encontrar la sucursal más cercana.',
        description3:
          'Para abonar la cuota de tu préstamo de manera online deberás ingresar a https://www.e-pagofacil.com/',
        description4:
          'Luego deberás enviar un comprobante con tu número de DNI a atencionalcliente@argenpesos.com.ar o por whatsapp al 011-6816-4074',
      };
      break;
    case 2:
      modalContent = {
        title: 'Mercado Pago',
        description:
          'Para abonar la cuota de tu préstamo por Mercado Pago debes comunicarte por WhatsApp con el sector de cobranzas',
        description2:
          'Ahí te enviaremos un link de pago con el importe de la cuota para que puedas pagar',
        description3:
          'El pago puede hacerse con dinero en cuenta, tarjeta de débito o crédito (este último posee interés).',
        description4:
          'Luego deberás enviar un comprobante con tu número de DNI a cobranzas@argenpesos.com.ar o por WhatsApp al 011-5022-5639',
      };
      break;
    case 3:
      modalContent = {
        title: 'Transferencia o depósito',
        description:
          'Para abonar la cuota de tu préstamo por este medio deberás realizar una transferencia / depósito a una de las siguientes cuentas:.',
        description2:
          'BANCO GALICIA Cuenta Corriente en Pesos 3424/1 068/6 Transferencia CBU 0070068920000003424164',
        description3:
          'BBVA FRANCES Cuenta Corriente en Pesos 039/2222/2 Transferencia CBU 01700398-20000000222228',
        description4:
          'Luego deberás enviar un comprobante con tu número de DNI a atencionalcliente@argenpesos.com.ar o por whatsapp al 011-6816-4074',
      };
      break;
    case 4:
      modalContent = {
        title: 'Rapi Pago',
        description:
          'Para abonar la cuota de tu préstamo por Rapipago deberás asistir de manera presencial a cualquier sucursal (ingresá a https://rapipago.com.ar para encontrar la sucursal más cercana).',
        description2:
          'Deberás realizar un pago abierto a empresa sin factura a nombre de Argencred S.A o Argenpesos.',
        description3: 'Indicar CUIL (titular del préstamo) y monto a abonar.',
        description4:
          'Luego deberás enviar un comprobante con tu número de DNI a atencionalcliente@argenpesos.com.ar o por whatsapp al 011-6816-4074',
      };
      break;
    case 5:
      modalContent = {
        title: 'Billetera virtual',
        description:
          'Para abonar la cuota de tu préstamo escanea el QR desde tu billetera virtual favorita y luego ingresá el monto a pagar',
        description2: '',
        description3:
          'Luego deberás enviar un comprobante con tu número de DNI a atencionalcliente@argenpesos.com.ar o por whatsapp al 011-6816-4074',
        description4: '',
      };
      break;
    case 6:
      modalContent = {
        title: 'Consultá tu cuenta',
        description:
          'Para abonar la cuota de tu préstamo ingresa a nuestra página y selecciona “Ingresá a tu cuenta”',
        description2: '',
        description3:
          'Si no tenés usuario ingresá a “Aún no tengo usuario” y generá uno solo con tu DNI y una clave.',
        description4: 'Ahí podrás abonar la cuota de tu préstamo y ver tu estado de cuenta.s',
      };
      break;
    case 7:
      modalContent = {
        title: 'Sucursal',
        description:
          'Para abonar la cuota de tu préstamo en una de nuestras sucursales, solamente tenés que acercarte a la más cercana con tu DNI.',
        description2: '',
        description3:
          'Consulta tu sucursal más cercana aquí https://www.argenpesos.com.ar/sucursales',
        description4: '',
      };
      break;
    default:
      modalContent = {
        title: '',
        description: '',
        description2: '',
        description3: '',
        description4: '',
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
          {modalContent.description2 && (
            <Text
              style={[styles.description, [1, 3].includes(methodIndex) && styles.descriptionBlue]}>
              {modalContent.description2}
            </Text>
          )}
          {methodIndex === 5 && <Image source={images.qr_billetera} style={styles.imageStyle} />}
          {modalContent.description3 && (
            <Text
              style={[
                styles.description,
                [0, 2, 3, 4, 5, 6, 7].includes(methodIndex) && styles.descriptionBlue,
              ]}>
              {modalContent.description3}
            </Text>
          )}
          {modalContent.description4 && (
            <Text
              style={
                (styles.description,
                [0, 1, 2, 3, 4, 6].includes(methodIndex) && styles.descriptionBlue)
              }>
              {modalContent.description4}
            </Text>
          )}
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
    padding: 30,
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
    fontSize: 12,
    marginBottom: 20,
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontWeight: '400',
    lineHeight: 18.24,
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
  descriptionBlue: {
    backgroundColor: '#1DB8F014',
    color: colors.texts,
    fontSize: 12,
    fontFamily: fonts.gotham.regular,
    fontWeight: '400',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
  },
  imageStyle: {
    width: 148,
    height: 148,
    marginBottom: 15,
  },
});

export default PaymentMethodModal;
