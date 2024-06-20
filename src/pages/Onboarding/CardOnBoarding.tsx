import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { fonts } from "src/theme/fonts";
import { activateOnboarding } from "../../store/actions/auth";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

interface CardOnBoardingProps {
  data: {
    number: number;
    title: string;
    component: React.FC;
  };
  max: number;
  navigation?: any;
}

const CardOnBoarding = ({ data, max, navigation }: CardOnBoardingProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleNext = () => {
    if (data.number === max) {
      handleSkip();
    } else {
      navigation.navigate(`card-${data.number + 1}`);
    }
  };
  const handleSkip = () => {
    dispatch(activateOnboarding("activated"));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@assets/images/background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.body}>
          <data.component />
        </View>
        <View>
          <View style={styles.containerLine}>
            <View
              style={
                data.number === 1 ? styles.lineActive : styles.lineInactive
              }
            />
            <View
              style={
                data.number === 2 ? styles.lineActive : styles.lineInactive
              }
            />
            <View
              style={
                data.number === 3 ? styles.lineActive : styles.lineInactive
              }
            />
          </View>
          <Pressable onPress={handleNext}>
            <Text style={styles.buttonNext}>Siguiente</Text>
          </Pressable>
          <Pressable onPress={handleSkip}>
            <Text style={styles.buttonSkip}>Omitir</Text>
          </Pressable>
        </View>
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
  title: {
    fontFamily: fonts.gotham.bold,
    fontSize: 36,
    color: "#ffffff",
    textAlign: "center",
  },
  body: {
    height: 350,
  },
  containerLine: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  lineActive: {
    width: 59,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  lineInactive: {
    width: 10,
    height: 7,
    opacity: 0.7,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonNext: {
    backgroundColor: "#006E9A",
    color: "#ffffff",
    width: 164,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSkip: {
    textDecorationLine: "underline",
    color: "#ffffff",
    width: 164,
    height: 50,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardOnBoarding;
