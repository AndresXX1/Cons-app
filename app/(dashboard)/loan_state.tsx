import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { colors, fonts } from '@/theme';
import { useRef } from 'react';

const LoanState = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>¿Cómo está el estado de mi préstamo?</Text>

          <View style={styles.stateDay}>
            <Text style={styles.textButton}>Estado al día</Text>
          </View>
          <Text style={styles.textState}>
            Tu préstamo está al día. ¡Buen trabajo! Seguí manteniendo tus pagos al día.{' '}
          </Text>
          <View style={styles.stateLate}>
            <Text style={styles.textButton}>Estado atrasado</Text>
          </View>
          <Text style={styles.textState}>
            Tenés un pago atrasado. Te recomendamos realizar el pago lo antes posible para evitar
            cargos adicionales.
          </Text>
          <View style={styles.stateIrregular}>
            <Text style={styles.textButton}>Estado irregular</Text>
          </View>
          <Text style={styles.textState}>
            Tu préstamo está en estado irregular debido a múltiples pagos atrasados. Por favor,
            ponete en contacto con nosotros para analizar opciones y evitar incremento de deuda.
          </Text>
        </View>
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
  textTitle: {
    textAlign: 'center',
    color: colors.texts,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: fonts.gotham.semiBold,
    maxWidth: 245,
    marginHorizontal: 'auto',
    marginBottom: 54,
  },
  stateDay: {
    backgroundColor: colors.green,
    width: 190,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  textButton: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
  },
  textState: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    lineHeight: 20.96,
    fontWeight: '400',
    marginTop: 7,
  },
  stateLate: {
    backgroundColor: '#A17504',
    width: 190,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 45,
  },
  stateIrregular: {
    backgroundColor: '#A10404',
    width: 190,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginTop: 45,
  },
});

export default LoanState;
