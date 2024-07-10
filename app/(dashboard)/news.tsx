import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const NewsScreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const news = [
    {
      id: 1,
      title: '¡No te olvides de la PROMO REFERIDOS!',
      description:
        'Porque recomendar a un amigo o familiar en nuestras sucursales tiene beneficios para ellos y para vos ....',
      date: '23.05.2024',
      image: images.mockup_1,
    },
    {
      id: 2,
      title: '¡No te olvides de la PROMO REFERIDOS!',
      description:
        'Porque recomendar a un amigo o familiar en nuestras sucursales tiene beneficios para ellos y para vos ....',
      date: '23.05.2024',
      image: images.mockup_2,
    },
    {
      id: 3,
      title: '¡No te olvides de la PROMO REFERIDOS!',
      description:
        'Porque recomendar a un amigo o familiar en nuestras sucursales tiene beneficios para ellos y para vos ....',
      date: '23.05.2024',
      image: images.mockup_3,
    },
    {
      id: 4,
      title: '¡No te olvides de la PROMO REFERIDOS!',
      description:
        'Porque recomendar a un amigo o familiar en nuestras sucursales tiene beneficios para ellos y para vos ....',
      date: '23.05.2024',
      image: images.mockup_4,
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
      <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Text style={styles.title}>Nuestras Noticias</Text>
        <View style={styles.containerNews}>
          {news.map(item => {
            return (
              <View key={item.id}>
                <Image source={item.image} style={styles.imagenTitle} />
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
                <Pressable onPress={() => router.push('news_detail')}>
                  <Text style={styles.nreLink}>Leer más</Text>
                </Pressable>
              </View>
            );
          })}
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
    color: colors.blue,
    fontFamily: fonts.gotham.semiBold,
    marginBottom: 2,
  },
  helpIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: colors.green2,
    borderRadius: 30,
  },
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 42,
  },
  containerNews: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 50,
    gap: 54,
  },
  imagenTitle: {
    width: '100%',
    height: 200,
    borderRadius: 9,
  },
  date: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 13,
  },
  newsTitle: {
    color: colors.texts,
    fontFamily: fonts.gotham.bold,
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 13,
  },
  newsDescription: {
    color: colors.texts,
    fontFamily: fonts.gotham.regular,
    fontSize: 16,
    marginTop: 10,
    paddingHorizontal: 13,
  },
  nreLink: {
    color: colors.blue,
    fontFamily: fonts.gotham.bold,
    fontSize: 20,
    marginTop: 20,
    paddingHorizontal: 13,
    textDecorationLine: 'underline',
  },
});

export default NewsScreen;
