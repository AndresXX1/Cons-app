import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar';
import { fonts, colors, images } from '@/theme';

const UnregisteredUser = () => {
  return (
    <SafeAreaView style={styles.root}>
      <FocusAwareStatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.textTitle}>¡Buena elección!</Text>

        <Text style={styles.buttonPurple}>Suscribirse a estos beneficios</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: colors.gray,
  },
  container: {
    flex: 1,
    marginBottom: 50,
  },
  textTitle: {
    marginHorizontal: 'auto',
    maxWidth: 200,
    textAlign: 'center',
    fontSize: 40,
    color: colors.texts,
    fontFamily: fonts.gotham.bold,
    lineHeight: 44,
    fontWeight: '700',
  },
  buttonPurple: {
    backgroundColor: colors.purple,
    height: 54,
    width: '90%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.gotham.bold,
    fontWeight: '700',
    lineHeight: 25,
    textTransform: 'capitalize',
    marginHorizontal: 'auto',
    marginTop: 36,
  },
});

export default UnregisteredUser;
