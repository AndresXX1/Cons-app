import NavBar from '@components/NavBar';
import { images, fonts, colors } from '@theme';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const data = [
    {
      image: 'location_liniers',
      title: 'Liniers',
      location: 'Av. Rivadavia 11640',
      number: '6062-0475 15-2660-0019',
    },
    {
      image: 'location_avellaneda',
      title: 'Avellaneda',
      location: 'Av. Mitre 531',
      number: '4201-5784 / 6561 15-3252-5817',
    },
  ];

  const contact = [
    {
      image: 'contact_1',
      title: 'WhatsApp',
    },
    {
      image: 'contact_2',
      title: 'Teléfono',
    },
    {
      image: 'contact_3',
      title: 'Vía mail',
    },
  ];
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
        <View style={styles.line}></View>
        <View style={styles.containerOffices}>
          <Text style={styles.textOffices}>
            📍 Nuestras <span style={styles.span}>sucursales</span>
          </Text>
          <View style={styles.containerCircle}>
            <View style={styles.circleBlue}></View>
            <View style={styles.circleOffices}></View>
            <View style={styles.circleOffices}></View>
          </View>
        </View>
        <View style={styles.containerLocation}>
          {data.map((info, key) => (
            <View style={styles.containerLocationTwo} key={key}>
              <Image source={images[info.image]} style={styles.locationImage}></Image>
              <View style={styles.locationThree}>
                <Text style={styles.textLocation}>{info.title}</Text>
                <Text style={styles.textLocationTwo}>{info.location}</Text>
                <Text style={styles.textLocationTwo}>{info.number}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.textBlue}>Ver todas las sucursales</Text>

        <View style={styles.containerPay}>
          <Text style={styles.payTitle}>Medios de pago</Text>
          <Text style={styles.payTitleTwo}>para tu cuota</Text>
          <View style={styles.payContainer}>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_1} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>en línea</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_2} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Pago</Text>
              <Text style={styles.textPay}>fácil</Text>
            </View>
          </View>
          <View style={styles.payContainer}>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_3} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Mercado</Text>
              <Text style={styles.textPay}>Pago</Text>
            </View>
            <View style={styles.payContainerTwo}>
              <Image source={images.pay_4} style={styles.image_pay}></Image>
              <Text style={styles.textPay}>Transferencia/</Text>
              <Text style={styles.textPay}>Deposito</Text>
            </View>
          </View>
          <Text style={styles.textPayFinally}>Ver todos los medios de pago</Text>
        </View>
        <Text style={styles.textContact}>¿Tenés dudas?</Text>
        <Text style={styles.textContactTwo}>Contactanos</Text>

        <Text style={styles.textHour}>Horario de atención:</Text>
        <Text style={styles.textHourTwo}>Lunes a viernes de 8 a 20hs</Text>
        <Text style={styles.textHourThree}>Sábados de 9 a 13hs.</Text>

        {contact.map((data, key) => (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#00A5E7', '#4DCCFF']}
            style={styles.containerContact}
            key={key}>
            <Image source={images[data.image]} style={styles.contactImage}></Image>
            <Text style={styles.contactText}>{data.title}</Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F2',
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
  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#E9E9E9',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 22,
  },
  containerOffices: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
  textOffices: {
    color: '#575757',
    fontSize: 20,
    fontFamily: fonts.gotham.thin,
    fontWeight: '400',
    lineHeight: 26.2,
  },
  span: {
    fontWeight: '700',
    fontFamily: fonts.gotham.bold,
  },
  containerCircle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  circleOffices: {
    backgroundColor: '#D9D9D9',
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  circleBlue: {
    backgroundColor: colors.blue2,
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  containerLocation: {
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 22,
  },
  locationImage: {
    width: 160,
    height: 149,
    marginBottom: 6,
  },
  containerLocationTwo: {
    height: 239,
    backgroundColor: colors.white,
    width: 160,
    borderRadius: 10,
  },
  locationThree: {
    paddingLeft: 7,
    paddingRight: 7,
  },
  textLocation: {
    color: colors.blue2,
    fontSize: 14,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    marginTop: 2,
  },
  textLocationTwo: {
    color: colors.texts,
    fontSize: 13,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: 2,
    width: 136,
  },
  textBlue: {
    color: colors.blue,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 18,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    borderBottomWidth: 1,
    width: 242,
    marginHorizontal: 'auto',
    borderBottomColor: colors.blue,
  },
  containerPay: {
    backgroundColor: '#4DCCFF',
    borderRadius: 20,
    marginTop: 32,
  },
  payTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    paddingTop: 22,
    fontFamily: fonts.gotham.thin,
    fontWeight: '400',
  },
  payTitleTwo: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    paddingBottom: 36,
  },
  payContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 25,
  },
  image_pay: {
    width: 106,
    height: 106,
    marginBottom: 7,
  },
  payContainerTwo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 147,
  },
  textPay: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20.8,
    fontFamily: fonts.gotham.bold,
  },
  textPayFinally: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 44,
    marginBottom: 28,
  },
  textContact: {
    marginTop: 45,
    color: colors.texts,
    fontSize: 25,
    fontWeight: '400',
    lineHeight: 28.5,
    textAlign: 'center',
  },
  textContactTwo: {
    color: colors.texts,
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 28.5,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    marginBottom: 25,
  },
  textHour: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 27,
    color: colors.texts,
    fontFamily: fonts.gotham.thin,
    textAlign: 'center',
  },
  textHourTwo: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
  },
  textHourThree: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    marginBottom: 40,
  },
  containerContact: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    height: 92,
    backgroundColor: '#00A5E7',
    marginBottom: 34,
    marginHorizontal: 'auto',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  contactImage: {
    width: 48,
    height: 48,
  },
  contactText: {
    fontSize: 32,
    lineHeight: 43.2,
    fontWeight: '700',
    fontFamily: fonts.gotham.semiBold,
    color: colors.white,
  },
});

export default HomeScreen;
