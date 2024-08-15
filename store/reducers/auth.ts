import { createSlice } from '@reduxjs/toolkit';

import {
  logInAsync,
  getUserAsync,
  verifySessionAsync,
  logOutAsync,
  activateOnboarding,
  checkOnboarding,
  getNoticeAsync,
  selectNoticeId,
  getBannersAsync,
  registerInAsync,
} from '../actions/auth';

const initialState: AuthSliceState = {
  isAuth: false,
  isLoading: true,
  user: null,
  smarter: null,
  isOnboarding: false,
  notices: [],
  noticeId: null,
  banners: {
    home: [],
    cuponizate: [],
    argencompras: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logInAsync.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(logInAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(registerInAsync.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(registerInAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.smarter = action.payload.smarter;
      })
      .addCase(getUserAsync.rejected, state => {
        state.isAuth = false;
      })
      .addCase(verifySessionAsync.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(verifySessionAsync.rejected, state => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logOutAsync.fulfilled, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, state => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(activateOnboarding, state => {
        state.isOnboarding = true;
      })
      .addCase(checkOnboarding.fulfilled, (state, action) => {
        state.isOnboarding = action.payload;
      })
      .addCase(getNoticeAsync.fulfilled, (state, action) => {
        state.notices = action.payload.notices;
      })
      .addCase(getNoticeAsync.rejected, state => {
        state.notices = [];
      })
      .addCase(selectNoticeId, (state, action) => {
        state.noticeId = action.payload;
      })
      .addCase(getBannersAsync.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(getBannersAsync.rejected, state => {
        state.banners = {
          home: [],
          cuponizate: [],
          argencompras: [],
        };
      });
  },
});

export default authSlice.reducer;

export interface INotice {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
}

export interface IBanner {
  id: number;
  url: string;
}

export interface AuthSliceState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
  smarter: ISmarter | null;
  isOnboarding: boolean;
  notices: INotice[];
  noticeId: number | null;
  banners: {
    home: IBanner[];
    cuponizate: IBanner[];
    argencompras: IBanner[];
  };
}

export interface ISmarter {
  credits: ICredito[];
}

export interface ICredito {
  capital: number;
  fechaLiquidacion: string;
  estado: string;
}

export interface IUser {
  id: number;
  cuil: string;
  birthday: Date;
  first_name: string;
  phone: string;
  last_name: string;
  address: string | null;
  email: string;
  avatar: string;
  role: string;
}
