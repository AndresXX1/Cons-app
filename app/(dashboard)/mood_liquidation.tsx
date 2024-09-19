import { colors, fonts, images } from '@/theme';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { useRouter } from 'expo-router';

const MoodLiquidation = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <FocusAwareStatusBar backgroundColor={colors.blue2} barStyle="light-content" />
        <View style={styles.circle}>
          <Image source={images.mood_liquidation} style={styles.checkIcon} />
        </View>
        <Text style={styles.title}>En proceso de liquidación</Text>
      </View>
      <View>
        <Pressable style={styles.btnWhite} onPress={() => router.push('loan')}>
          <Text style={styles.btnText}>Volver atrás</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.skyBlue,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.gotham.bold,
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  },
  circle: {
    width: 148,
    height: 148,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  checkIcon: {
    width: 88,
    height: 88,
  },
  btnWhite: {
    backgroundColor: colors.white,
    height: 50,
    width: 236,
    borderRadius: 50,
    marginBottom: 30,
    marginHorizontal: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: fonts.gotham.bold,
    fontSize: 15,
    color: colors.blue,
    textAlign: 'center',
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 24,
    gap: 9,
  },
  btnBackText: {
    color: '#ffffff',
    fontFamily: fonts.gotham.regular,
    marginBottom: 2,
  },
});

export default MoodLiquidation;
