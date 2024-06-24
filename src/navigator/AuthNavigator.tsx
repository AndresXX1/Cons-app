import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MenuAuth from '@pages/MenuAuth';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';
import SignUp2 from '@pages/SignUp2';
import SignUp3 from '@pages/SignUp3';
import { StackHeaderLeft } from '@headers/StackHeaderLeft';
import { colors } from '@theme';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#40066C" />
      <Stack.Navigator initialRouteName="Menu">
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
          options={({ route, navigation }) => {
            return {
              headerTransparent: true,
              headerStyle: { backgroundColor: colors.transparent },
              title: 'SignUp',
              headerTitle: () => null,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <StackHeaderLeft
                  title={'Volver atrás'}
                  onPress={() => navigation.goBack()}
                  color={colors.blue}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name={`SignUp2`}
          component={SignUp2}
          options={({ route, navigation }) => {
            return {
              headerTransparent: true,
              headerStyle: { backgroundColor: colors.transparent },
              title: 'SignUp2',
              headerTitle: () => null,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <StackHeaderLeft
                  title={'Volver atrás'}
                  onPress={() => navigation.goBack()}
                  color={colors.blue}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name={`SignUp3`}
          component={SignUp3}
          options={({ route, navigation }) => {
            return {
              headerTransparent: true,
              headerStyle: { backgroundColor: colors.transparent },
              title: 'SignUp3',
              headerTitle: () => null,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <StackHeaderLeft
                  title={'Volver atrás'}
                  onPress={() => navigation.goBack()}
                  color={colors.blue}
                />
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
