import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { images } from '@theme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { apiUrls } from '../store/api';
import { CardSVG, NotificationSVG } from '../utils/icons';

interface HeaderProps {
  route: {
    key: string;
    name: string;
    params: any;
  };
}

const Header = ({ route }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  let title = '';

  if (route.name === 'Home') {
    return (
      <View style={styles.containerHome}>
        <View style={styles.homeButtons}>
          <CardSVG />
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
          <NotificationSVG />
        </View>
        <View>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>Hola! 👋🏻</Text>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>
            {user && user.first_name !== '' ? user.first_name : 'User'}{' '}
            {user && user.last_name !== '' ? user.last_name : 'Name'}
          </Text>
        </View>
        <View style={styles.menuInfo}>
          <Pressable style={styles.level}>
            <Text style={{ color: '#ffffff', fontSize: 20 }}>Estas en el nivel Platino</Text>
          </Pressable>
          <Pressable style={styles.points}>
            <Text style={{ color: '#ffffff', fontSize: 20 }}>Tenés 1500 puntos</Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (route.name === 'Benefits') {
    title = 'Benefits';
  } else if (route.name === 'Loan') {
    title = 'Loan';
  } else if (route.name === 'Shop') {
    return (
      <View style={styles.containerShop}>
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        <Image source={images.banner} style={styles.banner} resizeMode="cover" />
      </View>
    );
  } else if (route.name === 'Profile') {
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
  }

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    backgroundColor: '#00A5E7',
    height: 300,
    justifyContent: 'space-between',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  },
  points: {
    borderColor: '#ffffff',
    width: '100%',
    borderWidth: 1,
    height: 37,
    borderRadius: 10,
    paddingHorizontal: 5,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
  },
  banner: {
    width: 337,
    height: 207,
    marginBottom: -62,
    borderRadius: 20,
    borderColor: '#9D9D9D',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  containerProfile: {
    backgroundColor: '#00A5E7',
    height: 224,
    gap: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
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
});

export default Header;
