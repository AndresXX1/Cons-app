import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const NewsDetailScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.containerNews}>
          <View>
            <Image source={images.mockup_5} style={styles.imagenTitle} />
            <Text style={styles.newsTitle}>¡No te olvides de la PROMO REFERIDOS!</Text>
            <Text style={styles.newsDescription}>
              Porque recomendar a un amigo o familiar en nuestras sucursales tiene beneficios para
              ellos y para vos.{'\n\n'}Esa persona saca un préstamo y a vos ¡TE DAMOS $4.000 PARA EL
              PRÓXIMO PAGO DE TU CUOTA! 😉 🙌{'\n\n'}Promoción válida sólo para clientes ArgenPesos
              de sucursales oficiales con su cuota al día.
            </Text>
          </View>
        </View>
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
    paddingBottom: 40,
  },
  back: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
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
  helpIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: colors.green2,
    borderRadius: 30,
  },
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 42,
  },
  containerNews: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
    gap: 54,
  },
  imagenTitle: {
    width: '100%',
    height: 300,
    borderRadius: 9,
  },
  dateText: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 12,
    marginTop: 'auto',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  newsTitle: {
    color: colors.texts,
    fontFamily: fonts.gotham.bold,
    fontSize: 25,
    marginTop: 23,
  },
  newsDescription: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    marginTop: 20,
  },
});

export default NewsDetailScreen;
