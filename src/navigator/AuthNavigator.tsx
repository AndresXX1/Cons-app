import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MenuAuth from '@pages/MenuAuth';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';
import SignUp2 from '@pages/SignUp2';
import SignUp3 from '@pages/SignUp3';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#40066C" />
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name={`Menu`}
          component={MenuAuth}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name={`LogIn`}
          component={LogIn}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name={`SignUp`}
          component={SignUp}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name={`SignUp2`}
          component={SignUp2}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name={`SignUp3`}
          component={SignUp3}
          options={{
            headerShown: false,
            headerTitle: () => null,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
