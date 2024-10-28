import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';


const PaymentMethods = () => {
    return (
        <SafeAreaView style={styles.root}>
        <FocusAwareStatusBar backgroundColor={colors.blue} barStyle="dark-content" />
        <ScrollView style={styles.scrollView}>
        <ImageBackground source={images.background} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.containerPay}>
          <Text style={styles.payTitle}>Medios de pago</Text>
          <Text style={styles.payTitleTwo}>para tu cuota</Text>
          <View style={styles.payContainer}>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_1} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>en línea</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_2} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>fácil</Text>
            </View>
          </View>
          <View style={styles.payContainer}>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_3} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Mercado</Text>
              <Text style={styles.textPay}>Pago</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_4} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Transferencia/Deposito</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_1} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>en línea</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_2} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>fácil</Text>
            </View>
          </View>
          <View style={styles.payContainer}>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_3} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Mercado</Text>
              <Text style={styles.textPay}>Pago</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_4} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Transferencia/Deposito</Text>
            </View>
          </View>
        </View>

        </ImageBackground>
        </ScrollView>
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
        paddingVertical: 64,
        paddingHorizontal: 26,
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
      },
});

export default PaymentMethods