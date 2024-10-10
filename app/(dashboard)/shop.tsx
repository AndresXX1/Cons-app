import React, { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, images, fonts } from '@/theme';
import { Image } from 'react-native';
import NavBar from '@/components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { registerViewTime } from '@/store/service/timer';

const ShopScreen = () => {
  const { products } = useSelector((state: RootState) => state.auth);

  const scrollViewRef = useRef<ScrollView>(null);
  interface data {
    img: keyof typeof images;
    name: string;
    price: string;
  }

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
        registerViewTime({ time: seconds, view: 'argencompras' });
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.red2} barStyle="light-content" />
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <NavBar />
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <View style={styles.ContainerLogoDest}>
              <Image source={images.logo_featured} style={styles.logo}></Image>
              <Text style={styles.textLogo}>Productos{'\n'}destacados</Text>
            </View>
            <View style={styles.ContainerLogoDest}>
              <Image source={images.logo_electro} style={styles.logo}></Image>
              <Text style={styles.textLogo}>Electro</Text>
            </View>
            <View style={styles.ContainerLogoDest}>
              <Image source={images.logo_phone} style={styles.logo}></Image>
              <Text style={styles.textLogo}>Celulares</Text>
            </View>
          </View>
          <View style={styles.containerPoints}>
            <View style={styles.containerPointsRed}></View>
            <View style={styles.containerPointsGrey}></View>
          </View>
          <View style={styles.line}></View>

          <View style={styles.containerFilter}>
            <Image source={images.filter} style={styles.imageFilter}></Image>
            <Text style={styles.textFilter}>Filtrar</Text>
          </View>

          <Text style={styles.textProduct}>PRODUCTOS DESTACADOS</Text>

          <View style={styles.containerFeaturedFather}>
            {products.map((dat, key) => (
              <View key={key} style={styles.containerFeatured}>
                <View style={styles.containerImage}>
                <Image
                  source={{ uri: dat.images[1] ? dat.images[1].src : dat.images[0].src }}
                  style={styles.imageFeatured}></Image>
                </View>
                <View style={styles.containerFeaturedTwo}>
                  <Text style={styles.textFeaturedBlue}>{dat.name.es.length > 35 ? dat.name.es.substring(0, 35) + "..." : dat.name.es}</Text>
                  <Text style={styles.textFeaturedRed}>  ${parseInt(dat.variants[0].price, 10).toLocaleString('es-ES')}</Text>
                  <Pressable style={styles.buttonRed}><Text style={styles.buttonText}>COMPRAR AHORA</Text></Pressable>
                  <Pressable style={styles.buttonBlue}><Text style={styles.buttonText}>+ INFO</Text></Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    fontFamily: fonts.gotham.regular,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 85,
  },
  scrollView: {
    width: '100%',
  },
  containerLogo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  ContainerLogoDest: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  logo: {
    height: 97,
    width: 97,
  },
  textLogo: {
    color: colors.texts,
    fontSize: 15,
    fontFamily: fonts.gotham.bold,
    textAlign: 'center',
  },
  containerPoints: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 20,
  },
  containerPointsRed: {
    backgroundColor: colors.red2,
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  containerPointsGrey: {
    backgroundColor: '#D9D9D9',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  line: {
    width: '95%',
    height: 1,
    backgroundColor: '#E9E9E9',
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  containerFilter: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18,
    alignItems: 'center',
    gap: 4,
    marginBottom: 31,
  },
  imageFilter: {
    width: 24,
    height: 24,
  },
  textFilter: {
    fontSize: 20,
    color: colors.red2,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
  },
  textProduct: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    color: colors.texts,
    lineHeight: 26.2,
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  containerFeaturedFather: {
    display: 'flex',
    gap: 31,
    marginBottom: 100,
  },
  containerFeatured: {
    display: 'flex',
    flexDirection: 'row',
    width: 326,
    backgroundColor: colors.white,
    borderRadius: 12,
    height: 224,
  },
  containerFeaturedTwo: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  containerImage: {
    overflow: 'hidden',
    width: 163,
    height:224,
    borderRightColor: colors.gray4,
    borderRightWidth: 2,
    borderRadius: 12,
  },
  imageFeatured: {
    width: 163,
    height: "100%",
    borderRadius: 12,
    backgroundColor: '#F3F4F5',
    objectFit: 'cover',
  },
  textFeaturedBlue: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: fonts.gotham.semiBold,
    width: 130,
    lineHeight: 20,
    textTransform: 'capitalize',
  },
  textFeaturedRed: {
    color: colors.red,
    fontSize: 25,
    fontFamily: fonts.gotham.semiBold,
    paddingVertical: 18,
  },
  buttonRed: {
    flex: 1,
    backgroundColor: colors.red,
    width: 151,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.gotham.bold,
    borderRadius: 100,
    justifyContent: 'center',
    maxHeight: 32

  },
  buttonBlue: {
    flex: 1,
    backgroundColor: colors.blue,
    width: 151,
    alignItems: 'center',
    borderRadius: 100,
    fontSize: 12,
    marginTop: 13,
    justifyContent: 'center',
    maxHeight: 32

  },
  buttonText: {
    textAlign: 'center',
    fontFamily: fonts.gotham.bold,
    color: colors.white,
    fontSize: 12,
    textTransform: 'uppercase',
  }
});

export default ShopScreen;
