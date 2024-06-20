import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import CardOnBoarding from "src/pages/Onboarding/CardOnBoarding";
import OnBoardingOne from "../pages/Onboarding/OnBoardingOne";
import OnBoardingTwo from "../pages/Onboarding/OnBoardingTwo";
import OnBoardingThree from "../pages/Onboarding/OnBoardingThree";

const Stack = createNativeStackNavigator();

const CardScreen = ({ navigation, route }: any) => {
  const { card, max } = route.params;
  return <CardOnBoarding data={card} max={max} navigation={navigation} />;
};

const OnBoardingNavigator = () => {
  const cards = [
    {
      number: 1,
      title: "Registrarme o Iniciar Sesión",
      component: OnBoardingOne,
    },
    {
      number: 2,
      title: "Explora tus opciones",
      component: OnBoardingTwo,
    },
    {
      number: 3,
      title: "¿Necesitas ayuda?",
      component: OnBoardingThree,
    },
  ];
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#40066C" />
      <Stack.Navigator>
        {cards.map((card, index) => {
          return (
            <Stack.Screen
              key={index}
              name={`card-${card.number}`}
              component={CardScreen}
              options={{
                headerShown: false,
                headerTitle: () => null,
                headerLeft: () => null,
              }}
              initialParams={{ card, max: cards.length }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OnBoardingNavigator;
