import { Stack } from 'expo-router';
import { colors } from '@/theme';
import { StackHeaderLeftGoBack } from '@/components/StackHeaderLeftGoBack';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: () => null,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'SignUp',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.white} />,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'SignUp',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Stack.Screen
        name="signup2"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'SignUp',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Stack.Screen
        name="signup3"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'SignUp',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
