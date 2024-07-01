import { colors } from '@theme';
import { View, StyleSheet, Text } from 'react-native';

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SupportScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default SupportScreen;
