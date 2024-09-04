import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { colors, fonts, images } from '@/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { apiUrls } from '../store/api';
import { usePathname, useRouter } from 'expo-router';
import BannersArgenCompras from '@/components/BannersArgenCompras';

const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  console.log(pathName);

  const { user, banners } = useSelector((state: RootState) => state.auth);
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
        <Image source={images.logo_purple} style={styles.logo} resizeMode="cover" />
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
    height: 48,
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
    backgroundColor: colors.white,
    height: 130,
    gap: 40,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavBar;
