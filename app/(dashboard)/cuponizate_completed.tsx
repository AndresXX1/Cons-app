import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { fonts, colors, images } from '@/theme';

const UnregisteredUser = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.container}>
        <Image source={images.image_completed} style={styles.image_completed}></Image>

        <Text style={styles.textOne}>¡En breve un asesor se contactara con vos!</Text>

        <Text style={styles.textTwo}>Horario de atención son de</Text>
        <Text style={styles.textThree}>unes a Viernes de 08 a 20hs. Sábados de 09 a 13hs.</Text>

        <Text style={styles.textReturn}>Volver al menú</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.purple,
  },
  container: {
    flex: 1,
    marginBottom: 50,
  },
  image_completed: {
    width: 148,
    height: 148,
    marginHorizontal: 'auto',
  },
  textOne: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.gotham.bold,
    textAlign: 'center',
    marginTop: 24,
  },
  textTwo: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.thin,
    textAlign: 'center',
    marginTop: 24,
  },
  textThree: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    textAlign: 'center',
    marginTop: 5,
  },
  textReturn: {
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default UnregisteredUser;
