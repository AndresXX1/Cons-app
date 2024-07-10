import React, { useRef } from 'react';
import { colors, fonts } from '@/theme';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const PointsQuestionsScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
        <Text style={styles.title}>
          ¿Cómo puedo sumar{'\n'}
          <Text style={styles.titleBold}>más puntos?</Text>
        </Text>
        <View style={styles.containerTexts}>
          <Text style={styles.mainText}>
            ·Renovando tu crédito <Text style={styles.redText}>(+1000pto.)</Text>
          </Text>
          <Text style={styles.mainText}>
            ·Referir a alguien <Text style={styles.redText}>(+3000pto.)</Text>
          </Text>
          <Text style={styles.mainText}>
            ·Suscripción en Cuponizate <Text style={styles.redText}>(+2000pto.)</Text>
          </Text>
          <Text style={styles.mainText}>
            ·Subir de categoría, cancelando{'\n'}préstamos{' '}
            <Text style={styles.redText}>(+1000 pto.)</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.gray,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
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
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 30,
    fontFamily: fonts.gotham.regular,
    lineHeight: 32,
    marginBottom: 76,
  },
  titleBold: {
    fontFamily: fonts.gotham.bold,
  },
  containerTexts: {
    width: '100%',
    paddingHorizontal: 20,
  },
  mainText: {
    color: colors.texts,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 24,
    marginBottom: 20,
  },
  redText: {
    color: colors.red,
    fontFamily: fonts.gotham.bold,
  },
});

export default PointsQuestionsScreen;
