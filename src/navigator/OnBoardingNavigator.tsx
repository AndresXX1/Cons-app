import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
//import { StatusBar } from 'expo-status-bar';

//import CardOnBoarding from 'src/pages/Onboarding/CardOnBoarding';
import OnBoardingOne from '../pages/Onboarding/OnBoardingOne';
//import OnBoardingTwo from '../pages/Onboarding/OnBoardingTwo';
//import OnBoardingThree from '../pages/Onboarding/OnBoardingThree';

const Stack = createNativeStackNavigator();
/*
const CardScreenOne = ({ navigation, route }: any) => {
  return (
    <CardOnBoarding
      data={{
        number: 1,
        title: 'Registrarme o Iniciar Sesión',
        component: OnBoardingOne,
      }}
      max={3}
      navigation={navigation}
    />
  );
};

const CardScreenTwo = ({ navigation, route }: any) => {
  return (
    <CardOnBoarding
      data={{
        number: 2,
        title: 'Explora tus opciones',
        component: OnBoardingTwo,
      }}
      max={3}
      navigation={navigation}
    />
  );
};

const CardScreenThree = ({ navigation }: any) => {
  return (
    <CardOnBoarding
      data={{
        number: 3,
        title: '¿Necesitas ayuda?',
        component: OnBoardingThree,
      }}
      max={3}
      navigation={navigation}
    />
  );
};*/

const OnBoardingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoardingOne">
      <Stack.Screen
        name={'OnBoardingOne'}
        component={OnBoardingOne}
        options={{
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
        }}
      />
      {/*<Stack.Screen
          name={`card-2`}
          component={CardScreenTwo}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name={`card-3`}
          component={CardScreenThree}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />*/}
    </Stack.Navigator>
  );
};

export default OnBoardingNavigator;
