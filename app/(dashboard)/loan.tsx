import NavBar from '@/components/NavBar';
import { colors, fonts } from '@/theme';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import React from 'react';

const LoanScreen = () => {
  const { smarter } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <NavBar />
      <Text style={styles.title}>
        Préstamos <Text style={styles.spanBold}>activos</Text>
      </Text>
      <View style={styles.containerButtons}>
        {smarter?.credits.map((credit, key) => {
          const formattedDate = credit.fechaLiquidacion.split('T')[0];
          const buttonColor = credit.estado === 'Vigente' ? styles.buttonGreen : styles.buttonRed;
          return (
            <React.Fragment key={key}>
              <Pressable style={buttonColor} onPress={() => router.push('settlement')}>
                <Text style={styles.textButton}>
                  Préstamo ${credit.capital.toLocaleString('es-ES', { minimumFractionDigits: 0 })}
                </Text>
              </Pressable>
              <Text style={styles.textFinaly}>Liquidado el {formattedDate}</Text>
            </React.Fragment>
          );
        })}
        {/*<Pressable style={styles.buttonGreen} onPress={() => router.push('settlement')}>
          <Text style={styles.textButton}>Préstamo $300.000</Text>
        </Pressable>
        <Text style={styles.textFinaly}>Liquidado el 10-03-2023</Text>
        <Pressable style={styles.buttonBrown} onPress={() => router.push('pending_payments')}>
          <Text style={styles.textButton}>Préstamo $250.000</Text>
        </Pressable>
        <Text style={styles.textFinaly}>Liquidado el 10-08-2023</Text>
        <Pressable style={styles.buttonRed} onPress={() => router.push('regularize_credits')}>
          <Text style={styles.textButton}>Préstamo $300.000</Text>
        </Pressable>
        <Text style={styles.textFinaly}>Liquidado el 10-05-2024</Text>*/}
        <View style={styles.line}></View>

        <Pressable style={styles.buttonTransparent} onPress={() => {}}>
          <Text style={styles.textTransparent}>Préstamo en Proceso</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20.96,
    textAlign: 'center',
  },
  spanBold: {
    fontWeight: '400',
    fontFamily: fonts.gotham.semiBold,
  },
  containerButtons: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
  },
  buttonGreen: {
    backgroundColor: colors.green,
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  buttonBrown: {
    backgroundColor: '#A17504',
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  buttonRed: {
    backgroundColor: '#A10404',
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  textButton: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
  },
  textFinaly: {
    color: colors.texts,
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 26.338,
    marginBottom: 20,
    fontFamily: fonts.gotham.semiBold,
  },
  buttonTransparent: {
    borderColor: '#006E9A',
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 26.338,
    textTransform: 'capitalize',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  textTransparent: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#E9E9E9',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default LoanScreen;
