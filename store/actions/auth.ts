import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { decode as atob } from 'base-64';
import { jwtDecode } from 'jwt-decode';

import { getItem, setItem, removeItem } from '../../utils/storage';
import { apiUrls, tokenAccess, baseUrl } from '../api';
import { useAppDispatch } from '../index';

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'X-Platform': 'iOS',
    'X-App-Build-Number': '1.0.0',
  },
});

let interceptor = 0;

const setupAxiosInterceptors = (dispatch: ReturnType<typeof useAppDispatch>) => {
  interceptor = axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = await getItem(tokenAccess.tokenName);
        const refreshToken = await getItem(tokenAccess.refreshTokenName);
        if (!token || !refreshToken) {
          dispatch(logOutAsync());
          return config;
        }

        const isRefreshTokenExpired = await isRefreshTokenAboutToExpire(refreshToken);
        if (isRefreshTokenExpired) {
          dispatch(logOutAsync());
          return config;
        }

        const isTokenExpired = await isTokenAboutToExpire(token);
        if (isTokenExpired) {
          const response = await axios.post(apiUrls.refreshToken(), {
            refresh_token: refreshToken,
          });
          if (response.data.ok) {
            config.headers['Authorization'] = `Bearer ${response.data.token}`;
            await setItem(tokenAccess.tokenName, response.data.token);
          } else {
            dispatch(logOutAsync());
          }
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};

export const registerInAsync = createAsyncThunk(
  'auth/registerInAsync',
  async (
    {
      data,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
      };
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.signUp(), { ...data, tokenNotifications });
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        dispatch(getBannersAsync());
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  async (
    {
      token,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
    }: {
      token: string;
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.googleSignIn(), { token, tokenNotifications });
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        dispatch(getBannersAsync());
        dispatch(getProductsAsync());
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const logInAsync = createAsyncThunk(
  'auth/logInAsync',
  async (
    {
      data,
      tokenNotifications,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
      };
      tokenNotifications: string;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue },
  ) => {
    setActive(true);
    try {
      const response = await axios.post(apiUrls.logIn(), { ...data, tokenNotifications });
      if (response.data.ok) {
        await setItem(tokenAccess.tokenName, response.data.token);
        await setItem(tokenAccess.refreshTokenName, response.data.refreshToken);
        setupAxiosInterceptors(dispatch);
        setActive(false);
        dispatch(getUserAsync());
        dispatch(getBannersAsync());
        dispatch(getProductsAsync());
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue('error');
      }
    } catch (error: any) {
      setActive(false);
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      setError(message);
      return rejectWithValue('error');
    }
  },
);

export const verifyEmail = createAsyncThunk(
  'auth/verify_email',
  async ({ email, userId }: { email: string; userId: number }) => {
    const response = await axios.post(apiUrls.verifyEmail(), { email, userId });
    return response.data;
  },
);

export const verifySessionAsync = createAsyncThunk(
  'auth/verifySessionAsync',
  async ({ dispatch }: { dispatch: ReturnType<typeof useAppDispatch> }, { rejectWithValue }) => {
    const isValidate = await validateToken();
    if (!isValidate) {
      await deleteAccess();
      return rejectWithValue('error');
    }
    try {
      setupAxiosInterceptors(dispatch);
      await dispatch(getUserAsync());
      await dispatch(getBannersAsync());
      await dispatch(getProductsAsync());
      return {};
      // eslint-disable-next-line
    } catch (error: any) {
      await deleteAccess();
      return rejectWithValue('error');
    }
  },
);

const deleteAccess = async () => {
  try {
    if (await validateToken()) {
      const token = await getItem(tokenAccess.tokenName);
      await axios.post(
        apiUrls.logOut(),
        {},
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  } finally {
    await removeItem(tokenAccess.tokenName);
    await removeItem(tokenAccess.refreshTokenName);
  }
};

export const validateToken = async () => {
  const token = await getItem(tokenAccess.tokenName);
  if (!token) {
    return false;
  }
  const refreshToken = await getItem(tokenAccess.refreshTokenName);
  if (!refreshToken) {
    return false;
  }
  if (await isRefreshTokenAboutToExpire(refreshToken)) {
    return false;
  }
  if (await isTokenAboutToExpire(token)) {
    const updated = await updatedToken();
    if (!updated) {
      return false;
    }
  }
  return true;
};

const isRefreshTokenAboutToExpire = async (refreshtoken: string, extraTimeInSeconds = 30) => {
  try {
    if (!refreshtoken) {
      return true;
    }
    const decodedToken = customJwtDecode(refreshtoken);
    const currentTime = Date.now() / 1000;
    const expirationTime = decodedToken.payload.exp;
    if (expirationTime !== undefined) {
      return expirationTime - currentTime <= extraTimeInSeconds;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const customJwtDecode = (token: string) => {
  // Decodifica el token base64 utilizando atob de base-64
  const tokenParts = token.split('.');
  const header = JSON.parse(atob(tokenParts[0]));
  const payload = JSON.parse(atob(tokenParts[1]));

  return {
    header,
    payload,
    signature: tokenParts[2],
  };
};

export const getSessionRegularId = async () => {
  const token = await getItem(tokenAccess.tokenName);
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode<any>(token);
  return decodedToken.sessionId;
};

const isTokenAboutToExpire = async (token: string, extraTimeInSeconds = 30) => {
  try {
    if (!token) {
      return true;
    }
    const decodedToken = customJwtDecode(token);
    const currentTime = Date.now() / 1000;
    const expirationTime = decodedToken.payload.exp;
    if (expirationTime !== undefined) {
      return expirationTime - currentTime <= extraTimeInSeconds;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const updatedToken = async () => {
  const refreshToken = await getItem(tokenAccess.refreshTokenName);
  if (!refreshToken) {
    return false;
  }
  try {
    const response = await axios.post(apiUrls.refreshToken(), {
      refresh_token: refreshToken,
    });
    if (response.data.ok) {
      await setItem(tokenAccess.tokenName, response.data.token);
      return true;
    } else {
      return false;
    }
    // eslint-disable-next-line
  } catch (error: any) {
    return false;
  }
};

export const logOutAsync = createAsyncThunk('auth/logOutAsync', async (_, { rejectWithValue }) => {
  try {
    await deleteAccess();
    return {};
    // eslint-disable-next-line
  } catch (error: any) {
    rejectWithValue('error');
  } finally {
    axiosInstance.interceptors.request.eject(interceptor);
  }
});

export const getUserAsync = createAsyncThunk(
  'auth/getUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Realizando solicitud a la API para obtener el usuario...');
      const response = await axiosInstance.get(apiUrls.getUser());
      console.log('Respuesta de la API:', response);
      if (response.data.ok) {
        console.log('Datos obtenidos correctamente:', response.data);
        return response.data;
      } else {
        console.log('La API devolvió un error.');
        return rejectWithValue('error');
      }
    } catch (error) {
      console.error('Error en getUserAsync:', error);
      return rejectWithValue('error');
    }
  },
);

export const getProductsAsync = createAsyncThunk(
  'auth/getProductsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getProducts());
      if (response.data.ok) {
        return response.data.products;
      } else {
        return rejectWithValue('error');
      }
    } catch (error: any) {
      return rejectWithValue('error');
    }
  },
);

export const getBannersAsync = createAsyncThunk(
  'auth/getBannersAsync',
  async (_, { rejectWithValue }) => {
    try {
      const banners = {
        home: [],
        cuponizate: [],
        argencompras: [],
      };
      const responseBannersHome = await axiosInstance.get(apiUrls.getBannersHome());
      if (responseBannersHome.data.ok) {
        banners.home = responseBannersHome.data.banners;
      } else {
        return rejectWithValue('error');
      }
      const responseBannersCuponizate = await axiosInstance.get(apiUrls.getBannersCuponizate());
      if (responseBannersCuponizate.data.ok) {
        banners.cuponizate = responseBannersCuponizate.data.banners;
      } else {
        return rejectWithValue('error');
      }
      const responseBannersArgencompras = await axiosInstance.get(apiUrls.getBannersArgencompras());
      if (responseBannersArgencompras.data.ok) {
        banners.argencompras = responseBannersArgencompras.data.banners;
      } else {
        return rejectWithValue('error');
      }
      return banners;
    } catch (error: any) {
      return rejectWithValue('error');
    }
  },
);

export const getNoticeAsync = createAsyncThunk(
  'auth/getNoticeAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getNotices());
      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue('error');
      }
      // eslint-disable-next-line
    } catch (error: any) {
      deleteAccess();
      return rejectWithValue('error');
    }
  },
);

export const getCuponsAsync = createAsyncThunk(
  'auth/getCuponsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getCupons());
      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue('error');
      }
      // eslint-disable-next-line
    } catch (error: any) {
      deleteAccess();
      return rejectWithValue('error');
    }
  },
);

export const activateOnboarding = createAction('auth/activateOnboarding', (payload: string) => {
  setItem(tokenAccess.onboardingName, payload);
  return { payload };
});

export const checkOnboarding = createAsyncThunk('auth/checkOnboarding', async () => {
  const onboarding = await getItem(tokenAccess.onboardingName);
  if (onboarding) {
    return true;
  }
  return false;
});

export const selectNoticeId = createAction('auth/selectNoticeId', (payload: number) => {
  return { payload };
});
