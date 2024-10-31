import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
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
import NavBar from '@/components/NavBar';
import { useFocusEffect, useRouter } from 'expo-router';
import { images, colors, fonts } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getCuponsAsync } from '@/store/actions/auth';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { registerViewTime } from '@/store/service/timer';
import CuponCard from '@/components/CuponCard';
import {
  ShopIcon,
  PizzaIcon,
  ClothesIcon,
  EdIcon,
  ServiceIcon,
  TourismIcon,
  GymIcon,
  HealthIcon,
  EntretainmentIcon,
  HelmetIcon,
  TheaterIcon,
  CarIcon,
  CinemaIcon,
  RealStateIcon,
  FurnitureIcon,
} from '@/components/Icons';

import Banners from '@/components/Banners';


const categoryOrder = [
  'Motos',
  'Autos',
  'Teatros',
  'Entretenimientos',
  'Educación',
  'Indumentaria, Calzado y Moda',
  'Belleza y Salud',
  'Servicios',
  'Cines',
  'Gimnasios y Deportes',
  'Turismo',
  'Gastronomía',
  'Compras',
  'Inmobiliarias',
  'Inmuebles',
];

const categoryIcons = {
  Motos: HelmetIcon,
  Autos: CarIcon,
  Teatros: TheaterIcon,
  Entretenimientos: EntretainmentIcon,
  Educación: EdIcon,
  'Indumentaria, Calzado y Moda': ClothesIcon,
  'Belleza y Salud': HealthIcon,
  Servicios: ServiceIcon,
  Cines: CinemaIcon,
  'Gimnasios y Deportes': GymIcon,
  Turismo: TourismIcon,
  Gastronomía: PizzaIcon,
  Compras: ShopIcon,
  Inmobiliarias: RealStateIcon,
  Inmuebles: FurnitureIcon,
};

const BenefitsScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { banners } = useSelector((state: RootState) => state.auth);


  // Obtener los cupones del estado
  const {
    user,
    cupons = [],
    cupons2 = [],
    cupons3 = [],
  } = useSelector((state: RootState) => state.auth);

  // Estado para categorías
  const [categories, setCategories] = useState([]);

  // Estado para búsqueda y categoría seleccionada
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCupons, setCategoryCupons] = useState([]);
  const [error, setError] = useState('');
  const [showClearButton, setShowClearButton] = useState(false);
  const [isLoadingCategoryCupons, setIsLoadingCategoryCupons] = useState(false);

  // Función para obtener cupones
  const getCupons = () => {
    dispatch(getCuponsAsync());
  };

  // Función para manejar el cambio en el campo de búsqueda
  const onSearchChange = (text: string) => {
    setSearchTerm(text);
    setSelectedCategory(null); // Limpiar la categoría seleccionada al buscar
  };

  const routerUnregisteredUser = () => {
    router.push('(dashboard)/unregistered_user');
  };

  // Función para limpiar la búsqueda
  const onClearSearch = useCallback(() => {
    setSearchTerm('');
    setError('');
  }, []);

  // Función para manejar la selección de una categoría
  const handleCategoryPress = category => {
    setSelectedCategory(category);
    setSearchTerm('');
    fetchCategoryCupons(category.final_id);
  };

  const handleClearCategoryPress = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setCategoryCupons([]);
  };

  // Función para obtener cupones de una categoría
  const fetchCategoryCupons = async final_id => {
    setIsLoadingCategoryCupons(true);
    try {
      const response = await fetch(`https://back5.maylandlabs.com/api/cupon/${final_id}`);
      const data = await response.json();
      if (data.ok) {
        setCategoryCupons(data.cupons);
      } else {
        console.error('Error fetching category cupons:', data);
        setCategoryCupons([]);
      }
    } catch (error) {
      console.error('Error fetching category cupons:', error);
      setCategoryCupons([]);
    } finally {
      setIsLoadingCategoryCupons(false);
    }
  };

  // Agregar categoría a cada cupón
  const cuponsWithCategory = cupons?.map(cupon => ({
    ...cupon,
    category: 'Recomendados',
  }));
  const cupons2WithCategory = cupons2?.map(cupon => ({
    ...cupon,
    category: 'Beneficios en seguros',
  }));
  const cupons3WithCategory = cupons3?.map(cupon => ({
    ...cupon,
    category: 'Viajes y traslados',
  }));

  // Combinar y eliminar duplicados
  const allCupons = useMemo(() => {
    const combined = [
      ...(cuponsWithCategory || []),
      ...(cupons2WithCategory || []),
      ...(cupons3WithCategory || []),
    ];
    const uniqueCupons = Array.from(new Map(combined.map(item => [item.id, item])).values());
    return uniqueCupons;
  }, [cuponsWithCategory, cupons2WithCategory, cupons3WithCategory]);

  // Filtrar cupones basado en el término de búsqueda
  const filteredCupons = useMemo(() => {
    if (searchTerm.length >= 1) {
      return allCupons.filter(cupon =>
        cupon.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return allCupons;
  }, [searchTerm, allCupons]);

  // Actualizar el estado de error y showClearButton
  useEffect(() => {
    if (searchTerm.length >= 1) {
      const hasNoResults = filteredCupons.length === 0;
      setError(hasNoResults ? 'No se encontró ningún cupón con ese nombre' : '');
      setShowClearButton(true);
    } else if (selectedCategory) {
      const hasNoResults = categoryCupons.length === 0;
      setError(hasNoResults ? 'No se encontraron cupones para esta categoría' : '');
      setShowClearButton(false);
    } else {
      setError('');
      setShowClearButton(false);
    }
  }, [searchTerm, filteredCupons, selectedCategory, categoryCupons]);

  // Filtrado basado en categoría (para vista general)
  const recommendedCupons = allCupons.filter(cupon => cupon.category === 'Recomendados');
  const segurosCupons = allCupons.filter(cupon => cupon.category === 'Beneficios en seguros');
  const viajesCupons = allCupons.filter(cupon => cupon.category === 'Viajes y traslados');

  // Obtener categorías del backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://back5.maylandlabs.com/api/cupon/category');
        const data = await response.json();
        if (data.ok) {
          setCategories(data.categories);
        } else {
          console.error('Error fetching categories:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

  // Ordenar las categorías
  const orderedCategories = useMemo(() => {
    return categories.slice().sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.nombre);
      const indexB = categoryOrder.indexOf(b.nombre);
      return indexA - indexB;
    });
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor={colors.purple} barStyle="light-content" />
      {allCupons.length > 0 ? (
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          <View style={styles.containerMain}>
            {/* Pasando las funciones y el estado relacionados con la búsqueda al NavBar */}
            <NavBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              onClearSearch={onClearSearch}
            />

            {/* Siempre mostrar las categorías */}
            {<Banners banners={banners?.cuponizate} />}

            <Text style={styles.textCoupons}>Explora cupones por categoría</Text>

            {orderedCategories.length > 0 ? (
              <ScrollView style={styles.containerCoupons} horizontal={true} showsHorizontalScrollIndicator={false} justifyContent="left">
                {orderedCategories.map((category) => {
                  const IconComponent = categoryIcons[category.nombre];
                  const isSelected = selectedCategory && selectedCategory.id === category.id;

                  return (
                    <Pressable
                      key={category.id}
                      onPress={() => handleCategoryPress(category)}
                    >
                      {({ pressed }) => (
                        <View style={[styles.couponsCont, { opacity: pressed ? 0.8 : 1 }]}>
                          <View
                            style={[
                              styles.containerCouponsChildren,
                              isSelected ? styles.selectedCategoryStyle : null,
                            ]}
                          >
                            {IconComponent ? (
                              <IconComponent />
                            ) : category.image ? (
                              <Image
                                source={{ uri: category.image }}
                                style={styles.imageCategory}
                              />
                            ) : (
                              <Text>No Icon</Text>
                            )}
                          </View>
                          <Text style={styles.textCouponsChildren}>{category.nombre}</Text>
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            ) : (
              <ActivityIndicator size="large" color={colors.purple} />
            )}

            {!user?.cuponizate && (
              <Pressable onPress={routerUnregisteredUser}>
                {({ pressed }) => (
                  <View style={[styles.buttonGreen, { opacity: pressed ? 0.6 : 1 }]}>
                    <Text style={styles.buttonGreenText}>¡Quiero estos beneficios!</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Mostrar cupones filtrados o secciones predeterminadas */}
            {searchTerm.length > 0 || selectedCategory ? (
              <View>
                <Pressable onPress={handleClearCategoryPress}>
                  {({ pressed }) => (
                    <Text style={[styles.clearFiltersText, { opacity: pressed ? 0.6 : 1 }]}>
                      Eliminar filtros
                    </Text>
                  )}
                </Pressable>
                <View style={styles.cuponContainer}>
                  {error ? (
                    <View style={styles.containerError}>
                      <Text style={styles.sadFace}>😞</Text>
                      <Text style={styles.errorText}>{error}</Text>
                      <Text style={styles.errorText2}>Prueba con otra búsqueda</Text>
                    </View>
                  ) : isLoadingCategoryCupons ? (
                    <ActivityIndicator size="large" color={colors.purple} />
                  ) : (
                    (searchTerm.length > 0 ? filteredCupons : categoryCupons).map(cupon => (
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
                              descripcion_micrositio: cupon.descripcion_micrositio
                                .replace(/<\/?p>/g, '')
                                .trim(),
                            },
                          })
                        }
                      />
                    ))
                  )}
                </View>
              </View>
            ) : (
              // Renderizar las secciones predeterminadas si no hay búsqueda ni categoría seleccionada
              <>
                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Recomendados</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {recommendedCupons.map(cupon => (
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
                              descripcion_micrositio: cupon.descripcion_micrositio
                                .replace(/<\/?p>/g, '')
                                .trim(),
                            },
                          })
                        }
                      />
                    ))}
                  </View>
                </ScrollView>

                {/* Beneficios en seguros */}
                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Beneficios en seguros</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {segurosCupons.map(cupon => (
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
                              descripcion_micrositio: cupon.descripcion_micrositio
                                .replace(/<\/?p>/g, '')
                                .trim(),
                            },
                          })
                        }
                      />
                    ))}
                  </View>
                </ScrollView>

                {/* Viajes y traslados */}
                <View style={styles.containerView}>
                  <Text style={styles.textRecom}>Viajes y traslados</Text>
                  <Text style={styles.textView}>Ver más</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.recomContainer}>
                    {viajesCupons.map(cupon => (
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
                              descripcion_micrositio: cupon.descripcion_micrositio
                                .replace(/<\/?p>/g, '')
                                .trim(),
                            },
                          })
                        }
                      />
                    ))}
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
  iconCategory: {
    width: 50,
    height: 50,
  },
  selectedCategoryStyle: {
    borderColor: colors.purple,
    borderWidth: 2,
  },
  clearFiltersText: {
    paddingLeft: 20,
    paddingTop: 30,
    color: colors.purple,
    fontFamily: fonts.gotham.bold,
    textDecorationLine: 'underline',
    paddingBottom: 10,
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
    paddingBottom: 100,
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
    paddingBottom: 300,
    paddingTop: 20,
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
    maxWidth: 250,
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
    marginTop: 40,
  },
  containerCoupons: {
    display: 'flex',
    paddingLeft: 16,
    gap: 21,
  },
  couponsCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: 88, // Ajusta el ancho para que las categorías se alineen correctamente'
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
    textAlign: 'center',
    maxWidth: 88,
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
    marginTop: 20,
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
});

export default BenefitsScreen;
