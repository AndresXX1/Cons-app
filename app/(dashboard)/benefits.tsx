import NavBar from '@/components/NavBar';
import { useFocusEffect, useRouter } from 'expo-router';
import { images, colors, fonts } from '@/theme';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getCuponsAsync } from '@/store/actions/auth';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { registerViewTime } from '@/store/service/timer';
import  CuponCard  from '@/components/CuponCard';

const BenefitsScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { user, cupons, cupons2, cupons3 } = useSelector((state: RootState) => state.auth);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);

  // Función para obtener cupones
  const getCupons = () => {
    dispatch(getCuponsAsync());
  };

  // Función para manejar el cambio en el campo de búsqueda
  const onSearchChange = text => {
    setSearchTerm(text);
  };

  const routerUnregisteredUser = () => {
    router.push('(dashboard)/unregistered_user');
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

  // Función para limpiar la búsqueda
  const onClearSearch = useCallback(() => {
    setSearchTerm('');
    setError('');
  }, []);

  // Filtrar cupones basado en el término de búsqueda
  const filteredCupons = useMemo(() => {
    if (searchTerm.length >= 1) {
      const filtered = cupons.filter(cupon =>
        cupon.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setError(filtered.length === 0 ? 'No se encontró ningún cupón con ese nombre' : '');
      setShowClearButton(true);
      return filtered;
    }
    setShowClearButton(false);
    setError('');
    return cupons;
  }, [searchTerm, cupons]);

  useEffect(() => {
    getCupons();
  }, []);

  // Función de registro de tiempo de visualización
  const trackViewTime = useCallback(() => {
    let seconds = 0;
    const intervalId = setInterval(() => {
      seconds += 1;
    }, 1000);

    return () => {
      clearInterval(intervalId);
      registerViewTime({ time: seconds, view: 'cuponizate' });
    };
  }, []);

  useFocusEffect(trackViewTime);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor={colors.purple} barStyle="light-content" />
      {cupons?.length > 0 ? (
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          <View style={styles.containerMain}>
            {/* Pasando las funciones y el estado relacionados con la búsqueda al NavBar */}
            <NavBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              onClearSearch={onClearSearch}
              showClearButton={showClearButton}
            />

            {/* Mostrar los resultados de búsqueda si hay un término de búsqueda */}
            {searchTerm.length > 0 ? (
              <View style={styles.cuponContainer}>
                {error ? (
                  <View style={styles.containerError}>
                  <Text style={styles.sadFace}>😞</Text>
                  <Text style={styles.errorText}>{error}</Text>
                  <Text style={styles.errorText2}>Prueba con otra busqueda</Text>
                  </View>
                ) : (
                  filteredCupons.map(cupon => (
                    <CuponCard
                    key={cupon.id}
                    cupon={cupon}
                    onPress={() =>
                      router.push({
                        pathname: 'single_cupon',
                        params: {
                          id: cupon.id,
                          nombre: cupon.nombre,
                          descuento: cupon.descuento,
                          uri: cupon.foto_principal.original,
                          descripcion_micrositio: cupon.descripcion_micrositio,
                        },
                      })
                    }
                  />
                  ))
                )}
              </View>
            ) : (
              // Mostrar la vista general de cupones si no hay búsqueda en curso
              <>
                <View style={styles.imageContainer}>
                <Image source={images.image_benefits} resizeMode="contain" style={styles.imageBenefits} />
                </View>
                <Text style={styles.textCoupons}>Explora cupones por categoría</Text>
                <View style={styles.containerCoupons}>
                  {info?.map((inf, key) => (
                    <View style={styles.couponsCont} key={key}>
                      <View style={styles.containerCouponsChildren}>
                        <Image source={images[inf.img]} style={styles.imageCategory}></Image>
                      </View>
                      <Text style={styles.textCouponsChildren}>{inf.text}</Text>
                    </View>
                  ))}
                </View>
                {!user?.cuponizate && (
                  <Pressable onPress={routerUnregisteredUser}>
                    <View style={styles.buttonGreen}>
                      <Text style={styles.buttonGreenText}>¡Quiero estos beneficios!</Text>
                    </View>
                  </Pressable>
                )}

                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Recomendados</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {cupons?.map((cupon, key) => {
                      return (
                        <CuponCard
                          key={key}
                          cupon={cupon}
                          onPress={() =>
                            router.push({
                              pathname: 'single_cupon',
                              params: {
                                id: cupon.id,
                                nombre: cupon.nombre,
                                descuento: cupon.descuento,
                                uri: cupon.foto_principal.original,
                                descripcion_micrositio: cupon.descripcion_micrositio
                                  .replace(/<\/?p>/g, '')
                                  .trim(),
                              },
                            })
                          }
                        />
                      );
                    })}
                  </View>
                </ScrollView>
                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Beneficios en seguros</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {cupons2?.map((cupon, key) => {
                      const descripcion_breve = cupon.descripcion_breve
                        .replace(/<\/?p>/g, '')
                        .trim();
                      const descripcion_micrositio = cupon.descripcion_micrositio
                        .replace(/<\/?p>/g, '')
                        .trim();

                      return (
                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: 'single_cupon',
                              params: {
                                id: cupon.id,
                                nombre: cupon.nombre,
                                descuento: cupon.descuento,
                                uri: cupon.foto_principal.original,
                                descripcion_micrositio: descripcion_micrositio,
                              },
                            })
                          }
                          key={key}
                          style={styles.containerRecom}>
                          <Image
                            source={{ uri: cupon.foto_principal.original }}
                            style={styles.imageRecom}
                          />
                          <Text style={styles.recomText1}>{cupon.nombre}</Text>
                          <Text style={styles.recomText2}>{cupon.descuento}</Text>
                          <Text style={styles.recomText3}>{descripcion_breve}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </ScrollView>
                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Viajes y translados</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {cupons3?.map((cupon, key) => {
                      const descripcion_breve = cupon.descripcion_breve
                        .replace(/<\/?p>/g, '')
                        .trim();
                      const descripcion_micrositio = cupon.descripcion_micrositio
                        .replace(/<\/?p>/g, '')
                        .trim();

                      return (
                        <Pressable
                          onPress={() =>
                            router.push({
                              pathname: 'single_cupon',
                              params: {
                                id: cupon.id,
                                nombre: cupon.nombre,
                                descuento: cupon.descuento,
                                uri: cupon.foto_principal.original,
                                descripcion_micrositio: descripcion_micrositio,
                              },
                            })
                          }
                          key={key}
                          style={styles.containerRecom}>
                          <Image
                            source={{ uri: cupon.foto_principal.original }}
                            style={styles.imageRecom}
                          />
                          <Text style={styles.recomText1}>{cupon.nombre}</Text>
                          <Text style={styles.recomText2}>{cupon.descuento}</Text>
                          <Text style={styles.recomText3}>{descripcion_breve}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.containerLoader}>
          <ActivityIndicator size={36} color={colors.purple} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: colors.purple,
  },
  imageContainer: {
    overflow: 'hidden',
    height: 244,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  containerMain: {
    backgroundColor: colors.gray,
    paddingBottom: 60,
  },
  scrollView: {
    width: '100%',
    backgroundColor: colors.purple,
  },
  cuponContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  sadFace: {
    fontSize: 60,
    textAlign: 'center',
  },
  errorText: {
    paddingVertical: 20,
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    fontSize: 24,
  },
  errorText2: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    textAlign: 'center',
    paddingVertical: 20,
  },
  containerError: {
    paddingBottom: 500,
    paddingTop: 60,
  },
  imageBenefits: {
    width: '95%',
    marginHorizontal: 'auto',
  },
  textCoupons: {
    textAlign: 'center',
    color: colors.texts,
    fontSize: 16,
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
      marginTop: 16,
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
    textAlign: 'center',
    marginHorizontal: 'auto',
    marginTop: 43,
  },
  buttonGreenText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  textRecom: {
    color: colors.texts,
    fontSize: 20,
    fontFamily: fonts.gotham.regular,
    lineHeight: 26.2,
  },
  textView: {
    color: colors.purple,
    fontSize: 12,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 15.72,
  },
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 42,
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
    lineHeight: 19,
    fontFamily: fonts.gotham.regular,
  },
  recomText2: {
    fontSize: 30,
    color: colors.texts,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    paddingVertical: 10,
  },
  recomText3: {
    fontSize: 10,
    textAlign: 'center',
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
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 19,
    paddingVertical: 10,
  },
});

export default BenefitsScreen;
