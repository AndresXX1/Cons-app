import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/store';

const useAuthRedirect = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && isAuth) {
      router.push('(dashboard)');
    }
  }, [isAuth, isMounted, router]);
};

export default useAuthRedirect;
