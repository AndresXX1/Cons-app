import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

const OnBoardingOne = () => {
  return (
    <View style={styles.container}>
      <Text>OnBoardingOne</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnBoardingOne;
