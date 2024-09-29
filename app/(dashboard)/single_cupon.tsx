import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { fonts, colors, images } from '@/theme';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { createCupon } from '@/store/service/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const parseHtmlToComponents = (htmlString: string) => {
  const boldRegex = /<b>(.*?)<\/b>/g;
  const underlineRegex = /<u>(.*?)<\/u>/g;
  const linkRegex = /<a href="(.*?)".*?>(.*?)<\/a>/g;
  const brRegex = /<br\s*\/?>/g;

  // Remplaza las etiquetas <b>, <u> y <a> con componentes de React Native
  let parsedString = htmlString
    .replace(boldRegex, '**$1**') // Usaremos '**' para negritas
    .replace(underlineRegex, '$1') // Usaremos '__' para subrayado
    .replace(brRegex, '\n'); // Reemplazar saltos de línea

  const parts = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  // Procesa los enlaces
  while ((match = linkRegex.exec(parsedString)) !== null) {
    // Agregar el texto antes del enlace
    if (match.index > lastIndex) {
      parts.push(parsedString.substring(lastIndex, match.index));
    }

    // Agregar el enlace como TouchableOpacity
    parts.push(
      <TouchableOpacity
        key={match[1]}
        onPress={() => Linking.openURL(match && match[1] ? match[1] : '')}>
        <Text style={styles.textRestBlack}>{match[2]}</Text>
      </TouchableOpacity>,
    );

    lastIndex = match.index + match[0].length;
  }

  // Agregar el texto restante después de los enlaces
  if (lastIndex < parsedString.length) {
    parts.push(parsedString.substring(lastIndex));
  }

  // Volver a procesar las negritas y subrayados
  return parts.map((part, index) => {
    if (typeof part === 'string') {
      return (
        <Text key={index}>
          {part.split('**').map((chunk, i) =>
            i % 2 === 1 ? (
              <Text key={i} style={styles.textRestBlack}>
                {chunk}
              </Text>
            ) : (
              chunk
            ),
          )}
        </Text>
      );
    }
    return part;
  });
};

const SingleCupon = () => {
  const { id, nombre, descuento, uri, descripcion_micrositio } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [active, setActive] = useState(false);

  const routerUnregisteredUser = () => {
    router.push('/(dashboard)/unregistered_user');
  };

  const routerNext = (code: string) => {
    router.push({
      pathname: '/(dashboard)/user_high',
      params: {
        code: code,
        nombre: nombre,
        descuento: descuento,
        uri: uri,
      },
    });
  };

  const handleGenerateCupon = async (id: number) => {
    setActive(true);
    await createCupon({
      id,
      setActive,
      routerNext,
    });
  };

  const renderedContent = parseHtmlToComponents(descripcion_micrositio as string);

  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.back}></View>
        <Image source={{ uri: uri as string }} style={styles.imageRecom}></Image>
        <Text style={styles.textDescount}>{descuento}</Text>
        <Text style={styles.textTitle}>{nombre}</Text>
        <Text style={styles.textBenefits}>Puedes usar este beneficio en:</Text>
        <View style={styles.online}>
          <Image source={images.world} style={styles.imageWorld}></Image>
          <Text style={styles.onlineText}>Online</Text>
        </View>
        <Pressable
          onPress={() => {
            if (user?.cuponizate) {
              handleGenerateCupon(Number(id));
            } else {
              routerUnregisteredUser();
            }
          }}>
          <View style={styles.buttonGreen}>
            {active && <ActivityIndicator size={22} color={colors.white} />}
            {!active && <Text style={styles.buttonGreenText}>¡Quiero este cupón!</Text>}
          </View>
        </Pressable>
        <View style={styles.containerDescrip}>
          <Text style={styles.textDescrip}>Descripción del beneficio</Text>
          <Text style={styles.textDescrip}>-</Text>
        </View>
        <View style={styles.containerRest}>
          <Text style={styles.textRest}>{renderedContent}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginBottom: 50,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 40,
  },
  back: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnBack: {
    display: 'flex',
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 9,
    marginVertical: 24,
  },
  arrow: {
    width: 14,
    height: 24,
  },
  btnBackText: {
    color: colors.purple,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  imageRecom: {
    width: 156,
    height: 149,
    marginTop: 37,
    marginHorizontal: 'auto',
  },
  textDescount: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: fonts.gotham.semiBold,
    lineHeight: 78.6,
    color: colors.texts,
  },
  textTitle: {
    color: colors.texts,
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 32.75,
    fontFamily: fonts.gotham.regular,
    marginBottom: 24,
  },
  textBenefits: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    textAlign: 'center',
    lineHeight: 20.96,
    fontSize: 16,
    marginBottom: 23,
  },
  imageWorld: {
    width: 18,
    height: 18,
  },
  online: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.purple,
    width: 90,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 'auto',
    gap: 5,
    marginBottom: 56,
  },
  onlineText: {
    fontSize: 14,
    color: colors.purple,
    fontFamily: fonts.gotham.regular,
    lineHeight: 18.34,
  },
  buttonGreen: {
    backgroundColor: colors.purple,
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginBottom: 34,
  },
  buttonGreenText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.gotham.bold,
    lineHeight: 26.338,
    textTransform: 'capitalize',
  },
  containerDescrip: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  textDescrip: {
    color: colors.texts,
    fontSize: 20,
    lineHeight: 26.2,
    fontFamily: fonts.gotham.regular,
    marginBottom: 21,
  },
  containerRest: {
    marginHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  textRest: {
    color: colors.texts,
    fontSize: 13,
    fontFamily: fonts.gotham.regular,
    lineHeight: 15,
  },
  textRestBlack: {
    color: colors.texts,
    fontFamily: fonts.gotham.semiBold,
  },
});

export default SingleCupon;
