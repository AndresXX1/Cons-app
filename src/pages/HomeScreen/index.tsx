import NavBar from '@components/NavBar';
import { images, fonts, colors } from '@theme';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <NavBar routeName="Home" />
        <Image source={images.banner_two} style={styles.banner} />
        <View style={styles.containerTitle}>
          <Text style={styles.text}>¡Llevate</Text>
          <Text style={styles.textBold}> HOY</Text>
          <Text style={styles.text}> tus</Text>
          <Text style={styles.textBold}> $300.000!</Text>
        </View>
        <Pressable style={styles.button}>
          <Image source={images.money_white} style={styles.moneyIcon} />
          <Text style={styles.textButton}>QUIERO MI PRÉSTAMO</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    paddingBottom: 100,
  },
  banner: {
    width: width - 32,
    height: 212,
    marginLeft: 16,
    borderRadius: 10,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.texts,
    fontSize: 20,
  },
  textBold: {
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
    fontSize: 20,
  },
  button: {
    backgroundColor: colors.red,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: width - 32,
    marginLeft: 16,
    height: 54,
    gap: 2,
    marginTop: 9,
  },
  moneyIcon: {
    width: 24,
    height: 24,
  },
  textButton: {
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    fontSize: 20,
  },
});

export default HomeScreen;
