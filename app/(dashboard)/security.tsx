import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Image, ScrollView, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const SecurityScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Text style={styles.title}>Seguridad</Text>
        <View style={styles.containerItem}>
          <Image source={images.key_vertical_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Cambiar contraseña</Text>
            <Text style={styles.offText}>Si desea realizar el cambio debe Cerrar sesión y haga click en Olvide mi contraseña.
            </Text>
          </View>
        </View>
        <Pressable onPress={() => Linking.openURL('https://www.argenpesos.com.ar/public/storage/pdf/ARGENCRED%20-%20Terminos%20y%20condiciones%20SITIO%20WEB.pdf')}>
        <View style={styles.containerItem}>
          <Image source={images.enhanced_encryption_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Ver politicas de{'\n'}privacidad</Text>
          </View>
        </View>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.argenpesos.com.ar/public/storage/pdf/ARGENCRED%20-%20Terminos%20y%20condiciones%20SITIO%20WEB.pdf')}>
        <View style={styles.containerItem}>
          <Image source={images.shield_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Ver términos y{'\n'}condiciones</Text>
          </View>
        </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.white,
  },
  scrollView: {
    width: '100%',
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
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 10,
    marginBottom: 20,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    gap: 15,
  },
  mainIcon: {
    width: 40,
    height: 40,
  },
  containerText: {
    flex: 1,
    gap: 5,
  },
  mainText: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.texts,
    fontSize: 20,
    lineHeight: 24,
  },
  offText: {
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
    fontSize: 14,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
});

export default SecurityScreen;
