import NavBar from '@/components/NavBar';
import { images, colors, fonts } from '@/theme';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getCuponsAsync, selectNoticeId } from '@/store/actions/auth';

const BenefitsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { cupons } = useSelector((state: RootState) => state.auth);
  const getCupons = () => {
    dispatch(getCuponsAsync());
  };

  const info = [
    {
      text: 'Compras',
      img: 'shopping',
    },
    {
      text: 'Gastronomía',
      img: 'local_pizza',
    },
    {
      text: 'Indumentaria',
      img: 'apparel',
    },
    {
      text: 'Educación',
      img: 'school',
    },
  ];

  const info3 = [
    {
      image: 'image_benefits_1',
      text: 'SEGURO DE AUTO',
      text2: 'Hasta 30%',
      text3: 'de descuento en seguros del auto.',
    },
    {
      image: 'image_benefits_2',
      text: 'SEGURO DE HOGAR',
      text2: 'Hasta 30%',
      text3: 'de descuento en seguros del hogar.',
    },
  ];

  const info4 = [
    {
      image: 'image_trips',
      text: 'YPF',
      text2: '15%',
      text3: '15% de descuento todos los días en naftas INFINIA.',
    },
    {
      image: 'image_trips',
      text: 'CODERHOUSE ONLINE',
      text2: '15%',
      text3: '15% todos los días en naftas INFINIA e INFINIA DIESEL.',
    },
  ];

  useEffect(() => {
    getCupons();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Image source={images.image_benefits} style={styles.imageBenefits}></Image>
        <Text style={styles.textCoupons}>Explora cupones por categoría</Text>\
        <View style={styles.containerCoupons}>
          {info.map((inf, key) => (
            <View style={styles.couponsCont} key={key}>
              <View style={styles.containerCouponsChildren}>
                <Image source={images[inf.img]} style={styles.imageCategory}></Image>
              </View>
              <Text style={styles.textCouponsChildren}>{inf.text}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.buttonGreen}>¡Quiero estos beneficios!</Text>
        <View style={styles.containerView}>
          <Text style={styles.textRecom}>Recomendados</Text>
          <Text style={styles.textView}>Ver más</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.recomContainer}>
            {cupons.map((cupon, key) => {
              const descripcion_breve = cupon.descripcion_breve.replace(/<\/?p>/g, '').trim();
              return (
                <View key={key} style={styles.containerRecom}>
                  <Image
                    source={{ uri: cupon.foto_principal.original }}
                    style={styles.imageRecom}
                  />
                  <Text style={styles.recomText1}>{cupon.nombre}</Text>
                  <Text style={styles.recomText2}>{cupon.descuento}</Text>
                  <Text style={styles.recomText3}>{descripcion_breve}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.containerView}>
          <Text style={styles.textRecom}>Beneficios en seguros</Text>
          <Text style={styles.textView}>Ver más</Text>
        </View>
        <View style={styles.recomContainer}>
          {info3.map((inf, key) => (
            <View key={key} style={styles.containerRecom}>
              <Image source={images[inf.image]} style={styles.imageRecom}></Image>
              <Text style={styles.recomText1}>{inf.text}</Text>
              <Text style={styles.recomText2_two}>{inf.text2}</Text>
              <Text style={styles.recomText3}>{inf.text3}</Text>
            </View>
          ))}
        </View>
        <View style={styles.containerView}>
          <Text style={styles.textRecom}>Viajes y traslados</Text>
          <Text style={styles.textView}>Ver más</Text>
        </View>
        <View style={styles.recomContainer}>
          {info4.map((inf, key) => (
            <View key={key} style={styles.containerRecom}>
              <Image source={images[inf.image]} style={styles.imageRecom}></Image>
              <Text style={styles.recomText1}>{inf.text}</Text>
              <Text style={styles.recomText2}>{inf.text2}</Text>
              <Text style={styles.recomText3}>{inf.text3}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
  },
  imageBenefits: {
    width: '95%',
    height: 212,
    marginHorizontal: 'auto',
    marginTop: 18,
    marginBottom: 32,
  },
  textCoupons: {
    textAlign: 'center',
    color: colors.texts,
    fontSize: 16,
    fontWeight: 300,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 10,
  },
  containerCoupons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 21,
  },
  couponsCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCouponsChildren: {
    width: 64.9,
    height: 64.9,
    borderRadius: 50,
    backgroundColor: colors.purple,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCategory: {
    width: 35.86,
    height: 31,
  },
  textCouponsChildren: {
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    fontSize: 10.039,
    fontWeight: 700,
    paddingTop: 6,
  },
  buttonGreen: {
    backgroundColor: colors.purple,
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    lineHeight: 26.338,
    textTransform: 'capitalize',
    marginHorizontal: 'auto',
    marginVertical: 43,
  },
  textRecom: {
    color: colors.texts,
    fontSize: 20,
    fontFamily: fonts.gotham.regular,
    lineHeight: 26.2,
    fontWeight: 400,
  },
  textView: {
    color: colors.purple,
    fontSize: 12,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: 700,
    lineHeight: 15.72,
  },
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  recomContainer: {
    flexDirection: 'row',
    gap: 16,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  containerRecom: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 156,
    paddingBottom: 8,
  },
  imageRecom: {
    width: 156,
    height: 149,
    marginBottom: 5,
  },
  recomText1: {
    textAlign: 'center',
    color: colors.texts,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 19,
    fontFamily: fonts.gotham.regular,
  },
  recomText2: {
    fontSize: 30,
    color: colors.texts,
    textAlign: 'center',
    fontWeight: 900,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    paddingVertical: 10,
  },
  recomText3: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 400,
    lineHeight: 10,
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    paddingHorizontal: 8,
    paddingTop: 2,
  },

  recomText2_two: {
    fontSize: 23,
    color: colors.texts,
    textAlign: 'center',
    fontWeight: 900,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    paddingVertical: 10,
  },
});

export default BenefitsScreen;
