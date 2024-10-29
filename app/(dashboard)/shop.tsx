import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { axiosInstance } from '@/store/actions/auth';
import { apiUrls } from '@/store/api';
import axios from 'axios';

const ShopScreen = () => {
  const { products } = useSelector((state: RootState) => state.auth);
  const [productsShop, setProductsShop] = useState<any[]>(products);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axiosInstance.get(apiUrls.getCategories()).then(res => setCategories(res.data.categories));
  }, []);

  async function getProductsByCategory(categoryId: number) {
    const response = await axios.put('https://back5.maylandlabs.com/api/product', { categoryIds: [categoryId] });
    setProductsShop(response.data.products.products);
  }

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
    }, []),
  );

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.red2} barStyle="light-content" />
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <NavBar />
        <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.containerLogo}>
              {categories.map(category => (
                <View key={category.id} style={styles.ContainerLogoDest}>
                  <Pressable onPress={() => getProductsByCategory(category.id)}>
                    <Image
                      source={{
                        uri: 'https://cdn.discordapp.com/attachments/888839207185948763/1300675873778962432/assets.png?ex=6721b44d&is=672062cd&hm=f84c526ad11576c0e2a20920293fc822cd31e7c2428c39368d716413309cc057&',
                      }}
                      style={styles.logo}></Image>
                  </Pressable>
                  <Text style={styles.textLogo}>{category.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* <View style={styles.containerFilter}>
            <Image source={images.filter} style={styles.imageFilter}></Image>
            <Text style={styles.textFilter}>Filtrar</Text>
          </View> */}

          <Text style={styles.textProduct}>PRODUCTOS DESTACADOS</Text>

          <View style={styles.containerFeaturedFather}>
            {productsShop.map((dat, key) => (
              <View key={key} style={styles.containerFeatured}>
                <View style={styles.containerImage}>
                  <img
                    src={`https://back7.maylandlabs.com/product/${dat.image}`}
                    style={styles.imageFeatured}></img>
                </View>
                <View style={styles.containerFeaturedTwo}>
                  <Text style={styles.textFeaturedBlue}>
                    {dat.name.length > 35 ? dat.name.es.substring(0, 35) + '...' : dat.name.es}
                  </Text>
                  <Text style={styles.textFeaturedRed}>
                    {' '}
                    ${parseInt(dat.price, 10).toLocaleString('es-ES')}
                  </Text>
                  <Pressable style={styles.buttonRed}>
                    <Text style={styles.buttonText}>COMPRAR AHORA</Text>
                  </Pressable>
                  <Pressable style={styles.buttonBlue}>
                    <Text style={styles.buttonText}>+ INFO</Text>
                  </Pressable>
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
    paddingTop: 80,
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
    height: 224,
    borderRightColor: colors.gray4,
    borderRightWidth: 2,
    borderRadius: 12,
  },
  imageFeatured: {
    width: 163,
    height: '100%',
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
    maxHeight: 32,
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
    maxHeight: 32,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: fonts.gotham.bold,
    color: colors.white,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default ShopScreen;
