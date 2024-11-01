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
        console.log(response.data);
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

export const applyForLoan = async (branchName: string) => {
  try {
    const response = await axiosInstance.get(apiUrls.applyForLoan(branchName));
    if (response.data.ok) {
      
      return response.data
    } else {
      return false
    }
    // eslint-disable-next-line
  } catch (error: any) {
    console.log(error)
    return false
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
  newImage,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  birthday?: Date;
  phone: string;
  newImage?: FormData;
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
      if (newImage) {
        await uploadImgAvatar(newImage, dispatch)
      } else {
        dispatch(getUserAsync())
      }
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

export const uploadImgAvatar = async (file: FormData, dispatch: ReturnType<typeof useAppDispatch>) => {
  try {
    const response = await axiosInstance.put(apiUrls.uploadImgAvatar(), file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.ok) {
      dispatch(getUserAsync())
      return response.data.avatar;
    } else {
      console.log("Error al subir imagen");
      return "";
    }
  } catch (error) {
    console.log("Error al subir imagen");
    return "";
  }
};

export const updateUserData = async ({
  id,
  first_name,
  last_name,
  cuil,
  phone,
  birthday,
  setError,
  setIsSubmitting,
  dispatch,
  routerNext,
}: {
  id: string | number;
  first_name?: string;
  last_name?: string;
  cuil?: string;
  phone?: string;
  birthday?: Date;
  setError: (error: string) => void;
  setIsSubmitting: (boolean: boolean) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
  routerNext: () => void;
}) => {
  try {
    setError('');
    const dataToUpdate: {
      first_name?: string;
      last_name?: string;
      cuil?: string;
      phone?: string;
      birthday?: Date;
    } = {};
    if (first_name) dataToUpdate.first_name = first_name;
    if (last_name) dataToUpdate.last_name = last_name;
    if (cuil) dataToUpdate.cuil = cuil;
    if (phone) dataToUpdate.phone = phone;
    if (birthday) dataToUpdate.birthday = birthday;

    const response = await axiosInstance.put(
      `${apiUrls.updateDataId(id.toString())}`,
      dataToUpdate,
    );
    if (response.data.ok) {
      dispatch(getUserAsync());
      routerNext();
    } else {
      setError(response.data.message);
    }
  } catch (error: any) {
    setError(error.response?.data?.message || 'Error al actualizar los datos');
  } finally {
    setIsSubmitting(false);
  }
};
