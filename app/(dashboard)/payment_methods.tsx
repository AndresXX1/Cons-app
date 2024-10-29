import React, { useRef, useState } from 'react';
import { colors, fonts, images } from '@/theme';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import PaymentMethodModal from '@/components/PaymentMethodModal';

const PaymentMethods = () => {
  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const paymentMethods = [
    { image: images.pay_1, text1: 'Pago', text2: 'en línea' },
    { image: images.pay_2, text1: 'Pago', text2: 'fácil' },
    { image: images.pay_3, text1: 'Mercado', text2: 'Pago' },
    { image: images.pay_4, text1: 'Transferencia/Deposito' },
    { image: images.pay_5, text1: 'Rapi', text2: 'Pago' },
    { image: images.pay_6, text1: 'Billetera', text2: 'Virtual' },
    { image: images.pay_7, text1: 'Web', text2: 'Argenpesos' },
    { image: images.pay_8, text1: 'Sucursal' },
  ];

  const openModal = (index: number) => {
    setSelectedMethodIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMethodIndex(null);
  };

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue} barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={images.background}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.containerPay}>
            <Text style={styles.payTitle}>Medios de pago</Text>
            <Text style={styles.payTitleTwo}>para tu cuota</Text>
          </View>
          <View style={styles.payContainerFather}>
            {paymentMethods.map((method, index) => (
              <Pressable
                key={index}
                style={styles.payContainerTwo}
                onPress={() => openModal(index)}>
                <View key={index} style={styles.payContainerTwo}>
                  <Image source={method.image} style={styles.image_pay} />
                  <Text style={styles.textPay}>{method.text1}</Text>
                  {method.text2 && <Text style={styles.textPay}>{method.text2}</Text>}
                </View>
              </Pressable>
            ))}
          </View>
        </ImageBackground>
      </ScrollView>
      <PaymentMethodModal
        isVisible={isModalVisible}
        methodIndex={selectedMethodIndex}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blue3,
  },
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 25,
  },
  containerPay: {
    borderRadius: 20,
  },
  payTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    paddingTop: 22,
    fontFamily: fonts.gotham.regular,
    fontWeight: '400',
  },
  payTitleTwo: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    paddingBottom: 36,
  },
  payContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 25,
  },
  payContainerFather: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 'auto',
    gap: 30,
  },
  image_pay: {
    width: 106,
    height: 106,
    marginBottom: 7,
  },
  payContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 147,
  },
  textPay: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20.8,
    fontFamily: fonts.gotham.bold,
    textAlign: 'center',
    maxWidth: 150,
  },
});

export default PaymentMethods;
