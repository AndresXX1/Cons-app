import { createAsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '..';
import { axiosInstance, getUserAsync } from '../actions/auth';
import { apiUrls } from '../api';

export const createCupon = async ({
  id,
  setActive,
  routerNext,
}: {
  id: number;
  setActive: (boolean: boolean) => void;
  routerNext: (code: string) => void;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.createCupon(), {
      id,
    });
    if (response.data.ok) {
      setActive(false);
      routerNext(response.data.cupon.codigo);
    } else {
      setActive(false);
    }
    // eslint-disable-next-line
  } catch (error: any) {
    setActive(false);
  } finally {
    setActive(false);
  }
};

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

export const forgetPasswordCode = createAsyncThunk(
  'auth/forget-password-code',
  async ({
    token,
    code,
    setError,
    setIsSubmitting,
    dispatch,
    routerNext,
  }: {
    token: string;
    code: string;
    setError: (error: string) => void;
    setIsSubmitting: (boolean: boolean) => void;
    dispatch: ReturnType<typeof useAppDispatch>;
    routerNext: () => void;
  }) => {
    try {
      setError('');
      const response = await axiosInstance.post(apiUrls.forgetPasswordCode(), {
        code,
        token,
      });
      if (response.data.ok) {
        setIsSubmitting(false);
        routerNext();
        console.log(response.data)
        return response.data.code;
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
  },
);


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

export const updateUserNameAndLastName = async ({
  id,
  first_name,
  last_name,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  id: string | number;
  first_name: string;
  last_name: string;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const response = await axiosInstance.put(`${apiUrls.updateDataId(id.toString())}`, {
      first_name,
      last_name,
    });

    if (response.data.ok) {
      dispatch(getUserAsync());
      routerNext();
    } else {
      setError(response.data.message);
    }
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al actualizar los datos');
  } finally {
    setIsSubmitting(false); // Asegúrate de restablecer el estado de carga
  }
};
