import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { images, fonts, colors } from '@/theme';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '@/components/NavBar';
import { useRouter } from 'expo-router';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import Banners from '@/components/Banners';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { registerViewTime } from '@/store/service/timer';
import  Slider  from '@/components/Slider';



const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [offices, setOffices] = useState([]);

  const { banners, smarter } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
       const response =  await fetch('https://back5.maylandlabs.com/api/branch')
       const {branches} = await response.json()  
       setOffices(branches) // branches 
      } catch (error) {
        console.error('Failed to fetch branch offices:', error);
      }
    };

    fetchOffices();
  }, []);
  

  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, []),
  );


  useFocusEffect(
    useCallback(() => {
      let seconds = 0;
      const intervalId = setInterval(() => {
        seconds += 1;
      }, 1000);

      return () => {
        clearInterval(intervalId);
        registerViewTime({ time: seconds, view: 'home' });
      };
    }, [])
  );

  const contact = [
    {
      image: 'contact_1',
      title: 'WhatsApp',
      redirect: 'https://wa.me/+541168164074', // WhatsApp link
    },
    {
      image: 'contact_2',
      title: 'Teléfono',
      redirect: 'tel:08002202743', // Phone link
    },
    {
      image: 'contact_3',
      title: 'Vía mail',
      redirect: 'mailto:atencionalcliente@argenpesos.com.ar', // Email link
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.containerMain}>
        <NavBar />

        {<Banners banners={banners.home} />}
        {
          smarter?.credits && smarter?.credits.length > 0 && (
            <View style={styles.containerTitle}>
              <Text style={styles.text}>¡Llevate</Text>
              <Text style={styles.textBold}> HOY</Text>
              <Text style={styles.text}> tus</Text>
              <Text style={styles.textBold}> $300.000!</Text>
            </View>
          )
        }
        
        <Pressable  style={styles.button} onPress={() => router.push('apply_for_loan')}>
          {({ pressed }) => (
          <View style={[styles.buttonContainer, { opacity: pressed ? 0.5 : 1 }]}>
          <Image source={images.money_white} style={styles.moneyIcon} />
          <Text style={styles.textButton}>QUIERO MI PRÉSTAMO</Text>
          </View>
          )}
        </Pressable>
        <View style={styles.line}></View>
        
        <Slider data={offices.slice(0, 6)}/>

        <Pressable onPress={() => router.push('branch_offices')}>
          <Text style={styles.textBlue}>Ver todas las sucursales</Text>
        </Pressable>

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
              <Text style={styles.textPay}>Transferencia/Deposito</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push('payment_methods')}>
          {({ pressed }) => (
            <Text style={[styles.textPayFinally, { opacity: pressed ? 0.5 : 1 }]}>Ver todos los medios de pago</Text>
          )}
          </Pressable>
        </View>
        <Text style={styles.textContact}>¿Tenés dudas?</Text>
        <Text style={styles.textContactTwo}>Contactanos</Text>

        <Text style={styles.textHour}>Horario de atención:</Text>
        <Text style={styles.textHourTwo}>Lunes a viernes de 8 a 20hs</Text>
        <Text style={styles.textHourThree}>Sábados de 9 a 13hs.</Text>

        {contact?.map((data, key) => (
          <Pressable
          key={key}
          onPress={() => Linking.openURL(data.redirect)} // Open respective link on press
          >
          {({ pressed }) => (
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#00A5E7', '#4DCCFF']}
          style={[styles.containerContact, {opacity: pressed ? 0.5 : 1 }]}
            key={key}>
            <Image source={images[data.image]} style={styles.contactImage}></Image>
            <Text style={styles.contactText}>{data.title}</Text>
          </LinearGradient>
          )}
          </Pressable>
        ))}
        <View style={{ marginBottom: 80 }}></View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blue2,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: colors.blue2,
  },
  containerMain: {
    backgroundColor: "#F1F2F2",
  },
  banner: {
    width: width - 32,
    height: 212,
    marginLeft: 16,
    borderRadius: 10,
    marginTop: 16,
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
    gap: 4,
    marginTop: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moneyIcon: {
    width: 24,
    height: 24,
  },
  textButton: {
    color: colors.white,
    fontFamily: fonts.gotham.bold,
    fontSize: 20,
    paddingStart: 3,
    paddingTop: 3,
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
  containerLocation: {
    paddingHorizontal: 10,
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
    textDecorationLine: 'underline',
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
    fontFamily: fonts.gotham.regular,
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
    textAlign: 'center',
  },
  textPayFinally: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.gotham.semiBold,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 44,
    marginBottom: 28,
    textDecorationLine: 'underline',
  },
  textContact: {
    fontFamily: fonts.gotham.regular,
    marginTop: 45,
    color: colors.texts,
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
  },
  textContactTwo: {
    marginTop: 4,
    color: colors.texts,
    fontSize: 36,
    fontWeight: '400',
    fontFamily: fonts.gotham.semiBold,
    textAlign: 'center',
    marginBottom: 25,
  },
  textHour: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 27,
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
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
