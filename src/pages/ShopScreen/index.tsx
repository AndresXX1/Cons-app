import { View, Text, StyleSheet } from 'react-native';

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ShopScreen</Text>
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

export default ShopScreen;
