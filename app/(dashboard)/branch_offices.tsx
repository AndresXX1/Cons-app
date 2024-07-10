import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const BranchOfficesScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const data = [
    {
      image: 'location_liniers',
      title: 'Liniers',
      location: 'Av. Rivadavia 11640',
      number: '6062-0475 15-2660-0019',
    },
    {
      image: 'location_avellaneda',
      title: 'Avellaneda',
      location: 'Av. Mitre 531',
      number: '4201-5784 / 6561 15-3252-5817',
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.gray} barStyle="dark-content" />
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={styles.title}>Nuestras sucursales</Text>

        {data.map((info, key) => (
          <View style={styles.containerLocation} key={key}>
            <Image source={images[info.image]} style={styles.locationImage}></Image>
            <View style={styles.locationThree}>
              <Text style={styles.textLocation}>{info.title}</Text>
              <Text style={styles.textLocationTwo}>{info.location}</Text>
              <Text style={styles.textLocationThree}>{info.number}</Text>
              <Text style={styles.textLocationThree}>Lun a Vier 9:00 a 18:45 hs</Text>
              <Text style={styles.textLocationThree}>Sab 9:00 a 13:00 hs</Text>
            </View>
            <View style={styles.containerButtons}>
              <View style={styles.buttonGreen}>
                <Image source={images.whatsapp} style={styles.imagenButtons} />
                <Text style={styles.textButtonGreen}>WhatsApp</Text>
              </View>
              <View style={styles.buttonBlue}>
                <Image source={images.google_maps} style={styles.imagenButtons} />
                <Text style={styles.textButtonBlue}>Google Maps</Text>
              </View>
            </View>
          </View>
        ))}
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
    paddingBottom: 20,
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
    paddingTop: 30,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 40,
  },
  locationImage: {
    width: 328,
    height: 193,
    marginBottom: 6,
    borderRadius: 9,
  },
  containerLocation: {
    height: 408,
    backgroundColor: colors.white,
    width: 328,
    borderRadius: 10,
    marginHorizontal: 'auto',
    marginBottom: 40,
  },
  locationThree: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  textLocation: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    marginTop: 5,
    marginBottom: 10,
  },
  textLocationTwo: {
    color: colors.texts,
    fontSize: 16,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    marginTop: 2,
  },
  textLocationThree: {
    color: colors.texts,
    fontSize: 16,
    fontFamily: fonts.gotham.regular,
    lineHeight: 19,
    marginTop: 2,
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16,
    marginHorizontal: 'auto',
  },
  buttonGreen: {
    backgroundColor: '#05B922',
    width: 156,
    height: 46,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    gap: 3,
  },
  textButtonGreen: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.gotham.semiBold,
  },
  buttonBlue: {
    backgroundColor: colors.blue,
    width: 156,
    height: 46,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  textButtonBlue: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.gotham.semiBold,
  },
  imagenButtons: {
    width: 24,
    height: 24,
  },
});

export default BranchOfficesScreen;
