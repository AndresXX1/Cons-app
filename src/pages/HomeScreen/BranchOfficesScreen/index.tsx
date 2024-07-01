import { colors, fonts, images } from '@theme';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';

interface BranchOfficesScreenProps {
  navigation?: any;
}

const BranchOfficesScreen = ({ navigation }: BranchOfficesScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.btnBack}>
          <Image source={images.arrow_blue} style={styles.arrow} />
          <Text style={styles.btnBackText}>Volver atrás</Text>
        </Pressable>
      </View>
      <Text>BranchOfficesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
});

export default BranchOfficesScreen;
