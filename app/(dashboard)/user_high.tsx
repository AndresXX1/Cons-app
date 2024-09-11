import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { fonts, colors, images } from '@/theme';
import { useRef } from 'react';

const UserHigh = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} ref={scrollViewRef}>
            <Image source={images.image_recom} style={styles.imageRecom}></Image>
            <Text style={styles.textDescount}>20%</Text>
            <Text style={styles.textTitle}>Coderhouse Online</Text>

            <Image source={images.image_qr} style={styles.imageQr}></Image>
            <Text style={styles.textCode}>Código: 673918273</Text>
          </ScrollView>
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
  container: {
    flex: 1,
    marginBottom: 50,
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
    color: colors.purple,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  imageRecom: {
    width: 156,
    height: 149,
    marginTop: 37,
    marginHorizontal: 'auto',
  },
  textDescount: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: 900,
    lineHeight: 78.6,
    color: colors.texts,
  },
  textTitle: {
    color: colors.texts,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 400,
    lineHeight: 32.75,
    fontFamily: fonts.gotham.regular,
    marginBottom: 48,
  },
  imageQr: {
    width: 196,
    height: 196,
    marginHorizontal: 'auto',
  },
  textCode: {
    color: colors.texts,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 32.75,
    fontFamily: fonts.gotham.regular,
    marginBottom: 30,
    paddingTop: 24,
  },
});

export default UserHigh;
