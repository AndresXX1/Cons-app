import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import { colors, fonts, images } from '@/theme';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateSecondData } from '@/store/service/user';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const SignUp4 = () => {
  const router = useRouter();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const routerNext = () => {
    router.replace('/(dashboard)');
  };

  if (!isAuth) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <View>
        <View style={styles.circle}>
          <Image source={images.check_blue} style={styles.checkIcon} />
        </View>
        <Text style={styles.title}>¡Felicitaciones {user?.first_name}!</Text>
        <Text style={styles.textDescription}>Ya eres parte de la comunidad ARGEN</Text>
      </View>
      <View style={styles.center}>
        <Pressable onPress={routerNext} style={styles.btnWhite}>
          <Text style={styles.btnText}>Continuar</Text>
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
  title: {
    fontFamily: fonts.gotham.bold,
    fontSize: 36,
    paddingHorizontal: 25,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 148,
    height: 148,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 64,
  },
  checkIcon: {
    width: 116,
    height: 116,
  },
  textDescription: {
    paddingHorizontal: 25,
    fontFamily: fonts.gotham.regular,
    fontSize: 24,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 32,
  },
  btnWhite: {
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 60,
  },
  btnText: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.blue,
    textAlign: 'center',
  },
  textBack: {
    fontFamily: fonts.gotham.semiBold,
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default SignUp4;
