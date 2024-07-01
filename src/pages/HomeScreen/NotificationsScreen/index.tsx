import { colors } from '@theme';
import { View, StyleSheet, Text } from 'react-native';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default NotificationsScreen;
