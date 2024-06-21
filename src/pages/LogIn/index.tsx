import { fonts } from '@theme';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import { images } from 'src/theme/images';
import { logInAsync } from '../../store/actions/auth';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

interface LogInProps {
  navigation?: any;
}

const LogIn = ({ navigation }: LogInProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    email: 'joseleonardoagreda@gmail.com',
    password: '123456',
  });
  const handleLogIn = () => {
    if (!data.email) {
      setError('Email is required');
      return;
    }
    if (!data.password) {
      setError('Password is required');
      return;
    }
    dispatch(logInAsync({ data, setActive, setError, dispatch }));
  };
  const handleInputChange = (name: string, value: string) => {
    setError('');
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.back}>
          <Pressable onPress={() => navigation.navigate('Menu')} style={styles.btnBack}>
            <Image source={images.arrow_back} />
            <Text style={styles.btnBackText}>Volver atrás</Text>
          </Pressable>
          <Image source={images.logo} style={styles.logo} resizeMode="cover" />
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            value={data.email}
            onChangeText={text => {
              handleInputChange('email', text);
            }}
          />
          <TextInput
            secureTextEntry={!passwordVisible}
            placeholder="Contraseña"
            value={data.password}
            onChangeText={text => {
              handleInputChange('password', text);
            }}
          />
          <Pressable onPress={() => handleLogIn()}>
            {!active ? <Text>Iniciar sesión</Text> : <Text>loading</Text>}
          </Pressable>

          {error && <Text>{error}</Text>}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    height: 180,
    width: width,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
  },
  btnBackText: {
    color: '#ffffff',
    fontFamily: fonts.gotham.regular,
    marginBottom: 2,
  },
  logo: {
    width: 154,
    height: 48,
    marginHorizontal: width / 2 - 77,
  },
  form: {
    backgroundColor: '#F1F2F2',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: height - 180,
    width: width,
  },
});

export default LogIn;
