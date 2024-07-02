import React, { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, images, fonts } from '@theme';
import { Image } from 'react-native';
import NavBar from '@components/NavBar';

const ShopScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  interface data {
    img: keyof typeof images;
    name: string;
    price: string;
  }
  const data = [
    {
      img: 'samsumg',
      name: 'Samsung Galaxy A14 4G BLACK',
      price: '$270.000',
    },
    {
      img: 'samsumg',
      name: 'Samsung Galaxy A14 4G BLACK',
      price: '$270.000',
    },
    {
      img: 'samsumg',
      name: 'Samsung Galaxy A14 4G BLACK',
      price: '$270.000',
    },
    {
      img: 'samsumg',
      name: 'Samsung Galaxy A14 4G BLACK',
      price: '$270.000',
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }, []),
  );
  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView}>
      <NavBar routeName="Shop" />
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <View style={styles.ContainerLogoDest}>
            <Image source={images.logo_featured} style={styles.logo}></Image>
            <Text style={styles.textLogo}>
              Productos
              destacados
            </Text>
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
          {data.map((dat, key) => (
            <View key={key} style={styles.containerFeatured}>
              <Image source={images[dat.img]} style={styles.imageFeatured}></Image>
              <View style={styles.containerFeaturedTwo}>
                <Text style={styles.textFeaturedBlue}>{dat.name}</Text>
                <Text style={styles.textFeaturedRed}>{dat.price}</Text>
                <Text style={styles.buttonRed}>COMPRAR AHORA</Text>
                <Text style={styles.buttonBlue}>+ INFO</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 85,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 50,
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
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
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
  },
  containerFeaturedFather: {
    display: 'flex',
    gap: 31,
    marginBottom: 70,
  },
  containerFeatured: {
    display: 'flex',
    flexDirection: 'row',
    width: 326,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  containerFeaturedTwo: {
    display: 'flex',
    flexDirection: 'column',
    width: 163,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 12,
  },
  imageFeatured: {
    width: 163,
    height: 224,
    borderRadius: 12,
    backgroundColor: '#F3F4F5',
  },
  textFeaturedBlue: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    width: 122,
    lineHeight: 24,
  },
  textFeaturedRed: {
    color: colors.red,
    fontSize: 25,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    width: 167,
    lineHeight: 19,
    paddingVertical: 18,
  },
  buttonRed: {
    backgroundColor: colors.red,
    color: colors.white,
    height: 32,
    width: 151,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    fontSize: 12,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
  },
  buttonBlue: {
    backgroundColor: colors.blue,
    color: colors.white,
    height: 32,
    width: 151,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    fontSize: 12,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    marginTop: 13,
  },
});

export default ShopScreen;
