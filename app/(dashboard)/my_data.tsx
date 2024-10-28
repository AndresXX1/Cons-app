import React, { useRef } from 'react';
import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Image, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';

const MyDataScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  console.log(user);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Text style={styles.title}>Mis datos personales</Text>

        <View style={styles.containerItem}>
          <Image source={images.for_you_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Nombre y apellido</Text>
            <Text style={styles.offText}>
              {user && user.first_name !== '' ? user.first_name : 'User'}{' '}
              {user && user.last_name !== '' ? user.last_name : ''}
            </Text>
          </View>
          <Pressable onPress={() => router.push('edit_name')}>
            <Image source={images.edit_square_blue} style={styles.editIcon} />
          </Pressable>
        </View>
        <View style={styles.containerItem}>
          <Image source={images.id_card_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>CUIL</Text>
            <Text style={styles.offText}>
              {user?.cuil.slice(0, 2)}-{user?.cuil.slice(2, 10)}-{user?.cuil.slice(10)}
            </Text>
          </View>
          <Image source={images.edit_square_blue} style={styles.editIcon} />
        </View>
        <View style={styles.containerItem}>
          <Image source={images.cake_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Fecha de nacimiento</Text>
            <Text style={styles.offText}>
              {' '}
              {user?.birthday
                ? new Date(user.birthday).toLocaleDateString()
                : 'Fecha no disponible'}
            </Text>
          </View>
          <Image source={images.edit_square_blue} style={styles.editIcon} />
        </View>
        <View style={styles.containerItem}>
          <Image source={images.dock_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Teléfono</Text>
            <Text style={styles.offText}>
              {user?.phone.slice(0, 3)} {user?.phone.slice(3, 5)} {user?.phone.slice(5, 9)}-
              {user?.phone.slice(9)}
            </Text>
          </View>
          <Image source={images.edit_square_blue} style={styles.editIcon} />
        </View>
        <View style={styles.containerItem}>
          <Image source={images.mail_blue} style={styles.mainIcon} />
          <View style={styles.containerText}>
            <Text style={styles.mainText}>Email</Text>
            <Text style={styles.offText}>{user?.email}</Text>
          </View>
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
  title: {
    color: colors.texts,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.gotham.semiBold,
    marginTop: 10,
    marginBottom: 20,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    gap: 15,
  },
  mainIcon: {
    width: 40,
    height: 40,
  },
  containerText: {
    flex: 1,
    gap: 5,
  },
  mainText: {
    fontFamily: fonts.gotham.semiBold,
    color: colors.texts,
    fontSize: 20,
    lineHeight: 24,
  },
  offText: {
    fontFamily: fonts.gotham.regular,
    color: colors.texts,
    fontSize: 16,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  containerProgressBar: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.texts,
    borderRadius: 50,
  },
  progressBar: {
    height: 10,
    borderRadius: 50,
    width: '75%',
  },
  progressText: {
    fontFamily: fonts.gotham.bold,
    color: colors.texts,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default MyDataScreen;
