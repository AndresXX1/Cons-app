import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const WaitingLoan = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />

      <View style={styles.scrollView}>
        <View>
          <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
          <View style={styles.circle}>
            <Image source={images.hourglass} style={styles.checkIcon} />
          </View>
          <Text style={styles.title}>
            Por el momento, el sistema no registra un préstamo disponible
          </Text>
        </View>
        <Text style={styles.textDescription}>
          Contacta a un asesor para{'\n'}resolver tu situación.
        </Text>

        <Pressable style={styles.btnWhite} onPress={() => router.push('loan')}>
          <Text style={styles.btnText}>Contactar a un asesor</Text>
        </Pressable>

        <Pressable style={styles.btnRed} onPress={() => router.push('shop')}>
          <Text style={styles.btnTextWhite}>Ver productos Argencompras</Text>
        </Pressable>
        <Pressable style={styles.btnPurple} onPress={() => router.push('benefits')}>
          <Text style={styles.btnTextWhite}>Ver suscripción Cuponizate</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.skyBlue,
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontFamily: fonts.gotham.bold,
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
    maxWidth: 330,
    marginHorizontal: 'auto',
  },
  circle: {
    width: 148,
    height: 148,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  checkIcon: {
    width: 88,
    height: 88,
  },
  textDescription: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 50,
  },
  btnWhite: {
    backgroundColor: colors.white,
    height: 50,
    width: 296,
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRed: {
    backgroundColor: colors.red,
    height: 50,
    width: 296,
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPurple: {
    backgroundColor: colors.purple,
    height: 50,
    width: 296,
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.blue,
    textAlign: 'center',
  },
  btnTextWhite: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 24,
    gap: 9,
  },
  btnBackText: {
    color: '#ffffff',
    fontFamily: fonts.gotham.regular,
    marginBottom: 2,
  },
});

export default WaitingLoan;
