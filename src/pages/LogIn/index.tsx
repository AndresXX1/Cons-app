import { StatusBar } from "expo-status-bar";
import { View, Dimensions, StyleSheet, ImageBackground } from "react-native";

const { width, height } = Dimensions.get("window");

const LogIn = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@assets/images/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.back}></View>
        <View style={styles.form}></View>
      </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  back:{
    height: 180,
    width: width,
  },
  form: {
    backgroundColor: "#F1F2F2",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: height - 180,
    width: width,
  },
});

export default LogIn;
