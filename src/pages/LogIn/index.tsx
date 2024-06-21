import { fonts } from '@theme';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Text,
} from 'react-native';
import { images } from 'src/theme/images';

const { width, height } = Dimensions.get('window');

interface LogInProps {
  navigation?: any;
}

const LogIn = ({ navigation }: LogInProps) => {
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
        <View style={styles.form}></View>
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
