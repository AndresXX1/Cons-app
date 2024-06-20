import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MenuAuth from "../pages/MenuAuth";
import LogIn from "../pages/LogIn";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#40066C" />
      <Stack.Navigator initialRouteName="LogIn">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
