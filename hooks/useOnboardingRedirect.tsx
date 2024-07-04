import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/store';

const useOnboardingRedirect = () => {
  const { isOnboarding } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isOnboarding) {
      router.push('(auth)');
    }
  }, [isOnboarding, isMounted, router]);
};

export default useOnboardingRedirect;
