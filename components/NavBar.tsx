import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { colors, fonts, images } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { apiUrls } from '../store/api';
import { usePathname, useRouter } from 'expo-router';
import BannersArgenCompras from '@/components/BannersArgenCompras';
import { TextInput } from 'react-native-gesture-handler';
import { getCuponsAsync } from '@/store/actions/auth';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    banners,
    cupons = [],
    loadingCupons,
  } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingCupons, setIsLoadingCupons] = useState(false);
  const [filteredCupons, setFilteredCupons] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (pathName === '/benefits') {
      setIsLoadingCupons(true);
      dispatch(getCuponsAsync()).finally(() => setIsLoadingCupons(false));
    }
  }, [pathName, dispatch]);

  const handleSearch = () => {
    setIsLoadingCupons(true);
    setError('');

    // Llamar a la API para obtener los cupones
    dispatch(getCuponsAsync())
      .then(() => {
        // Filtrar cupones por el término de búsqueda
        const cuponsFiltered = cupons.filter(cupon =>
          cupon.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (cuponsFiltered.length > 0) {
          setFilteredCupons(cuponsFiltered);
        } else {
          setError('No se encontró ningún cupón con ese nombre');
          setFilteredCupons([]);
        }
      })
      .finally(() => setIsLoadingCupons(false));
  };

  if (pathName === '/') {
    return (
      <View style={styles.containerHome}>
        <View style={styles.homeButtons}>
          <Pressable onPress={() => router.push('news')}>
            <Image
              source={images.breaking_news_white}
              style={styles.breakingNewsIcon}
              resizeMode="cover"
            />
          </Pressable>
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
          <Pressable onPress={() => router.push('notifications')}>
            <Image
              source={images.notification_white}
              style={styles.notificationIcon}
              resizeMode="cover"
            />
          </Pressable>
        </View>
        <View>
          <Text style={styles.wellcomeHome}>Hola! 👋🏻</Text>
          <Text style={styles.fullNameHome}>
            {user && user.first_name !== '' ? user.first_name : 'User'}{' '}
            {user && user.last_name !== '' ? user.last_name : ''}
          </Text>
        </View>
        <View style={styles.menuInfo}>
          <Pressable style={styles.level}>
            <Image source={images.platinum} style={styles.platinumIcon} resizeMode="cover" />
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.regular }}>
              Estas en el nivel
            </Text>
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.bold }}>
              {' '}
              Platino
            </Text>
          </Pressable>
          <Pressable style={styles.points}>
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.bold }}>
              Tenés 1500 puntos
            </Text>
            <Image source={images.arrow_back_white} style={styles.homeBack} resizeMode="cover" />
          </Pressable>
        </View>
      </View>
    );
  } else if (pathName === '/profile') {
    return (
      <View style={styles.containerProfile}>
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        <Image
          source={{
            uri:
              user && user.avatar !== '' && user.avatar !== null
                ? apiUrls.avatar(user.avatar)
                : apiUrls.avatar('default.png'),
          }}
          style={styles.imgProfile}
          resizeMode="cover"
        />
      </View>
    );
  } else if (pathName === '/shop') {
    return (
      <View style={styles.containerShop}>
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        <BannersArgenCompras banners={banners.argencompras} />
      </View>
    );
  } else if (pathName === '/loan') {
    return (
      <View style={styles.containerLoan}>
        <View style={styles.LoanButtons}>
          <View />
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
          <Image source={images.info} style={styles.infoLoan} resizeMode="cover" />
        </View>
        <View style={styles.textsLoan}>
          <Text style={{ color: '#ffffff', fontSize: 25, fontFamily: fonts.gotham.semiBold }}>
            Préstamos actuales de
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 25, fontFamily: fonts.gotham.regular }}>
            {user && user.first_name !== '' ? user.first_name : 'User'}
            {user && user.last_name !== '' ? ` ${user.last_name}` : ''} 👇🏻
          </Text>
        </View>
      </View>
    );
  } else if (pathName === '/benefits') {
    return (
      <View style={styles.containerBenefits}>
        <View style={styles.containerMenu}>
          <Image source={images.cuponizate_white} style={styles.logo} resizeMode="cover" />
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputSearch}
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Pressable onPress={handleSearch}>
            <Image source={images.magnifying_glass} style={styles.iconMagnifying} />
          </Pressable>
        </View>

        {isLoadingCupons ? (
          <Text>Cargando cupones...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View style={styles.cuponContainer}>
            {filteredCupons?.length > 0 ? (
              filteredCupons?.map(cupon => (
                <View key={cupon.id} >
                  <Text style={styles.cuponTitle}>{cupon.nombre}</Text>
                  <Text style={styles.cuponDescription}>{cupon.descripcion}</Text>
                  <Pressable style={styles.cuponButton}>
                    <Text style={styles.cuponButtonText}>Usar Cupón</Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <Text>No hay cupones disponibles</Text>
            )}
          </View>
        )}
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  containerLoan: {
    backgroundColor: '#00A5E7',
    height: 243,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  LoanButtons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  infoLoan: {
    width: 24,
    height: 24,
  },
  textsLoan: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerHome: {
    backgroundColor: '#00A5E7',
    height: 299,
    justifyContent: 'space-between',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  breakingNewsIcon: {
    width: 31,
    height: 31,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  wellcomeHome: {
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    fontSize: 25,
  },
  fullNameHome: {
    color: colors.white,
    fontFamily: fonts.gotham.regular,
    fontSize: 25,
  },
  homeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  menuInfo: {
    width: '100%',
    gap: 9,
  },
  level: {
    borderColor: '#006E9A',
    width: '100%',
    borderWidth: 1,
    height: 37,
    borderRadius: 10,
    paddingHorizontal: 5,
    display: 'flex',
    gap: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  platinumIcon: {
    width: 27,
    height: 26,
  },
  points: {
    borderColor: '#ffffff',
    width: '100%',
    borderWidth: 1,
    height: 37,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeBack: {
    width: 10,
    height: 17,
  },
  container: {
    backgroundColor: '#00A5E7',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  containerShop: {
    backgroundColor: '#ED1A00',
    height: 300,
    gap: 40,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  banner: {
    width: 337,
    height: 207,
    marginBottom: -62,
    borderRadius: 20,
    borderColor: '#9D9D9D',
    borderWidth: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  containerProfile: {
    backgroundColor: '#00A5E7',
    height: 224,
    gap: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 35,
  },
  logo: {
    width: 154,
    height: 50,
    marginTop: 20,
    color: colors.white,
    marginHorizontal: 'auto',
    objectFit: 'contain',
  },
  hamburguerMenu: {
    width: 35,
    height: 35,
    color: colors.white,
  },
  imgProfile: {
    width: 107,
    height: 107,
    borderRadius: 60,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderWidth: 6,
    marginBottom: -30,
  },
  containerBenefits: {
    backgroundColor: colors.purple,
    height: 224,
    gap: 10,
    paddingTop: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 5,
    zIndex: 1
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  inputSearch: {
    backgroundColor: colors.white,
    height: 50,
    paddingHorizontal: 40,
    borderRadius: 15,
    fontSize: 16,
    color: colors.gray2,
    width: '90%',
  },
  containerInput: {
    position: 'relative',
    width: '100%',
    marginHorizontal: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    marginTop: 25,
  },
  iconMagnifying: {
    position: 'relative',
    width: 24,
    height: 24,
    left: 120,
    bottom: 33,
  },
  cuponContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1
  },
  cuponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cuponDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cuponButton: {
    backgroundColor: colors.purple,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cuponButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavBar;
