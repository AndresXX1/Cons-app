import React, { useCallback, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { firstWord } from '../../utils/format';
import { colors, fonts, images } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { logOutAsync } from '@/store/actions/auth';
import NavBar from '@/components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { Redirect, useRouter } from 'expo-router';
import { registerViewTime } from '@/store/service/timer';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuth, smarter } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuth) return router.push('(auth)');
  }, [isAuth]);

  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let seconds = 0;
      const intervalId = setInterval(() => {
        seconds += 1;
      }, 1000);

      return () => {
        clearInterval(intervalId);
        registerViewTime({ time: seconds, view: 'profile' });
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <NavBar />
        <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
        <Text style={styles.fullName}>
          {user?.first_name && firstWord(user.first_name)}
          {user?.last_name && ' '}
          {user?.last_name && firstWord(user.last_name)}
        </Text>
        <View style={styles.containerItem}>
          {smarter &&
          smarter.credits &&
          smarter.credits.length > 0 &&
          smarter.credits[0].categoria ? (
            <Image
              source={images[smarter.credits[0].categoria]}
              style={styles.imageIcon}
              resizeMode="cover"
            />
          ) : (
            <Image source={images.Bronce} style={styles.imageIcon} resizeMode="cover" />
          )}
          <Text style={{ color: colors.texts, fontSize: 16, fontFamily: fonts.gotham.regular }}>
            Nivel
          </Text>
          <Text style={{ color: colors.texts, fontSize: 16, fontFamily: fonts.gotham.bold }}>
            {''}
            {smarter && smarter.credits && smarter.credits.length > 0
              ? smarter.credits[0].categoria
              : 'Bronce'}
          </Text>
        </View>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['#F3E670', '#FFBA08']}
          style={styles.linearGradient}>
          <View>
            <Text style={styles.points}>{user?.points}</Text>
            <Text style={styles.pointText}>puntos</Text>
          </View>
          <Pressable style={styles.buttonPoints}>
            <Text style={styles.textButton}>Canjear puntos</Text>
          </Pressable>
        </LinearGradient>
        <Pressable onPress={() => router.push('points_questions')}>
          {({ pressed }) => (
            <Text style={[styles.link, { opacity: pressed ? 0.5 : 1 }]}>
              ¿Cómo puedo sumar más puntos?
            </Text>
          )}
        </Pressable>
        <Pressable style={styles.buttonBlue} onPress={() => router.push('my_data')}>
          <View style={styles.iconCointainer}>
            <Image source={images.profile_white} style={styles.icon} />
            <Text style={styles.textButtonBlue}>Mis datos personales</Text>
          </View>
          <Image source={images.arrow_back_white} style={styles.arrow} />
        </Pressable>
        <Pressable style={styles.buttonBlue2} onPress={() => router.push('security')}>
          <View style={styles.iconCointainer}>
            <Image source={images.security_white} style={styles.icon} />
            <Text style={styles.textButtonBlue}>Seguridad</Text>
          </View>
          <Image source={images.arrow_back_white} style={styles.arrow} />
        </Pressable>
        <Pressable style={styles.buttonBlue2} onPress={() => router.push('help')}>
          <View style={styles.iconCointainer}>
            <Image source={images.doubt_white} style={styles.icon} />
            <Text style={styles.textButtonBlue}>Preguntas frecuentes</Text>
          </View>
          <Image source={images.arrow_back_white} style={styles.arrow} />
        </Pressable>
        <Pressable style={styles.buttonLogOut} onPress={() => dispatch(logOutAsync())}>
          <View style={styles.iconCointainer}>
            <Image source={images.logout_blue} style={styles.icon} />
            <Text style={styles.textButtonLogOut}>Cerrar sesión</Text>
          </View>
          <Image source={images.arrow_back_blue} style={styles.arrow} />
        </Pressable>
        <Text style={styles.version}>Versión 1.6.2</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blue2,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: colors.gray,
  },
  fullName: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.texts,
    fontSize: 30,
    textAlign: 'center',
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },
  imageIcon: {
    width: 28,
    height: 26,
  },
  level: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.texts,
    fontSize: 16,
  },
  linearGradient: {
    marginTop: 42,
    height: 93,
    width: width - 32,
    marginLeft: 16,
    borderRadius: 10,
    paddingLeft: 18,
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  points: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 36,
  },
  pointText: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 25,
    marginTop: -5,
  },
  buttonPoints: {
    backgroundColor: colors.red,
    width: 143,
    paddingVertical: 10,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: { fontFamily: fonts.gotham.semiBold, color: colors.white, fontSize: 15 },
  link: {
    fontFamily: fonts.gotham.bold,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 26,
    textAlign: 'center',
  },
  buttonBlue: {
    backgroundColor: colors.blue,
    width: width - 32,
    marginLeft: 16,
    paddingVertical: 16,
    minHeight: 54,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 20,
    marginTop: 57,
  },
  buttonBlue2: {
    backgroundColor: colors.blue,
    width: width - 32,
    marginLeft: 16,
    paddingVertical: 16,
    minHeight: 54,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 20,
    marginTop: 31,
  },
  iconCointainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  textButtonBlue: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
    fontSize: 19,
  },
  arrow: {
    width: 8,
    height: 14,
  },
  buttonLogOut: {
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderWidth: 2,
    width: width - 32,
    marginLeft: 16,
    height: 54,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 20,
    marginTop: 64,
  },
  textButtonLogOut: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.blue,
    fontSize: 19,
  },
  version: {
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
    fontSize: 15,
    marginTop: 54,
    textAlign: 'center',
    marginBottom: 100,
  },
});

export default ProfileScreen;
