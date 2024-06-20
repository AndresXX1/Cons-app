import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { images } from "../../theme/images";

const { width } = Dimensions.get("window");
const logoMargin = 44;

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@assets/images/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image source={images.logo} style={styles.logo} resizeMode="cover" />
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
  logo: {
    width: width - 2 * logoMargin,
    height: (width - 2 * logoMargin) * 0.312,
  },
});

export default LoadingScreen;
