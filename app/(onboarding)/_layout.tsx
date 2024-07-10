import { RootState } from '@/store';
import { Stack, Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

const OnboardingLayout = () => {
  const { isOnboarding } = useSelector((state: RootState) => state.auth);

  if (isOnboarding) return <Redirect href="(auth)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
    </Stack>
  );
};

export default OnboardingLayout;
