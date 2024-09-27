import { useAppDispatch } from '..';
import { axiosInstance, getUserAsync } from '../actions/auth';
import { apiUrls } from '../api';

export const verifyCode = async ({
  code,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  code: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.verifyCode(), {
      verifyCode: code,
    });
    if (response.data.ok) {
      setIsSubmitting(false);
      dispatch(getUserAsync());
      routerNext();
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al enviar el codigo');
    setIsSubmitting(false);
  } finally {
    setIsSubmitting(false);
  }
};

export const resendVerifyCode = async ({
  setError,
  setIsSubmitting,
}: {
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.resendVerifyCode(), {});
    if (response.data.ok) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al enviar el codigo');
    setIsSubmitting(false);
  } finally {
    setIsSubmitting(false);
  }
};

export const updateFirstData = async ({
  first_name,
  last_name,
  cuil,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  first_name: string;
  last_name: string;
  cuil: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.updateFirstData(), {
      first_name,
      last_name,
      cuil,
    });
    if (response.data.ok) {
      setIsSubmitting(false);
      dispatch(getUserAsync());
      routerNext();
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al iniciar sesión');
    setIsSubmitting(false);
  } finally {
    setIsSubmitting(false);
  }
};

export const updateSecondData = async ({
  birthday,
  phone,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  birthday: Date;
  phone: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.post(apiUrls.updateSecondData(), {
      birthday,
      phone,
    });
    if (response.data.ok) {
      setIsSubmitting(false);
      dispatch(getUserAsync());
      routerNext();
    } else {
      setIsSubmitting(false);
      setError(response.data.message);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al iniciar sesión');
    setIsSubmitting(false);
  } finally {
    setIsSubmitting(false);
    setIsSubmitting(false);
  }
};
