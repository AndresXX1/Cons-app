import { View, Text, StyleSheet } from 'react-native';

const BenefitsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BenefitsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BenefitsScreen;
