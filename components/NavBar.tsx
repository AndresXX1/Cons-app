import { Text, View, StyleSheet, Image, Pressable, ActivityIndicator, Modal } from 'react-native';
import { colors, fonts, images } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { apiUrls } from '../store/api';
import { usePathname, useRouter } from 'expo-router';
import BannersArgenCompras from '@/components/BannersArgenCompras';
import { TextInput } from 'react-native-gesture-handler';


const NavBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { user, banners, smarter } = useSelector((state: RootState) => state.auth);

  if (pathName === '/') {
    return (
      <View style={styles.containerHome}>
        <View style={styles.homeButtons}>
          <Pressable onPress={() => router.push('news')}>
            {({ pressed }) => (
              <View style={{ opacity: pressed ? 0.5 : 1 }}>
                <Image
                  source={images.breaking_news_white}
                  style={styles.breakingNewsIcon}
                  resizeMode="cover"
                />
              </View>
            )}
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
            {smarter?.credits[0].categoria ? 
              <Image source={images[smarter.credits[0].categoria]} style={styles.platinumIcon} resizeMode="cover" />
              :
              <Image source={images.sinRango} style={styles.platinumIcon} resizeMode="cover" />
            }
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.regular }}>
              Estas en el nivel
            </Text>
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.bold }}>
              {' '}
              {smarter ? smarter.credits[0].categoria : "Sin Rango"}
            </Text>
          </Pressable>
          <Pressable style={styles.points}>
            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: fonts.gotham.bold }}>
              Tenés {user?.points} puntos
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
          <Pressable onPress={() => router.push('loan_state')}>
            <Image source={images.info} style={styles.infoLoan} resizeMode="cover" />
          </Pressable>
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
          <Image source={images.cuponizate_white} style={styles.logo} resizeMode="center" />
        </View>
        <View style={styles.containerSearch}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.inputSearch}
              placeholder="Buscá un cupon..."
              value={searchTerm}
              onChangeText={text => onSearchChange(text)}
              placeholderTextColor={colors.gray2}
            />
            {searchTerm && (
              <Pressable onPress={onClearSearch} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✖</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerLoan: {
    height: 243,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: colors.blue2,
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
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
    backgroundColor: colors.blue2,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
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
    marginTop: 22,
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
    gap: 10,
    marginTop: 14,
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  containerSearch: {
    position: 'relative',
  },
  containerMenu: {
    marginTop: 20,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 54,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  inputSearch: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: colors.white,
    paddingLeft: 8,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.purple,
  },
  cupon: {
    zIndex: 10,
    padding: 20,
  },
  cuponContainer: {
    position: 'absolute',
    top: 100,
    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'column',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  cuponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cuponDescription: {
    fontSize: 14,
    color: colors.gray2,
  },
  cuponButton: {
    backgroundColor: colors.blue2,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  cuponButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default NavBar;
