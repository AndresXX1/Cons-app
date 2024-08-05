import React, { useEffect, useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeAsync, selectNoticeId } from '@/store/actions/auth';
import { apiUrls } from '@/store/api';

const NewsScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { notices } = useSelector((state: RootState) => state.auth);
  const scrollViewRef = useRef<ScrollView>(null);
  const getNotices = () => {
    dispatch(getNoticeAsync());
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + ' ...';
    }
    return text;
  };

  useEffect(() => {
    getNotices();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Text style={styles.title}>Nuestras Noticias</Text>
        <View style={styles.containerNews}>
          {notices.map(notice => {
            return (
              <View key={notice.id}>
                <Image source={{ uri: apiUrls.imgNotice(notice.url) }} style={styles.imagenTitle} />
                <Text style={styles.date}>{notice.date}</Text>
                <Text style={styles.newsTitle}>{notice.title}</Text>
                <Text style={styles.newsDescription}>{truncateText(notice.description, 101)}</Text>
                <Pressable
                  onPress={() => {
                    dispatch(selectNoticeId(notice.id));
                    router.push('news_detail');
                  }}>
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
