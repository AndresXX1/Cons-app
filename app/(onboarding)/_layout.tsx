import { Stack, useRouter } from 'expo-router';
import useOnboardingRedirect from '@/hooks/useOnboardingRedirect';

const OnboardingLayout = () => {
  useOnboardingRedirect();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
    </Stack>
  );
};

export default OnboardingLayout;
