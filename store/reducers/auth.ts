import { createSlice } from '@reduxjs/toolkit';

import {
  logInAsync,
  getUserAsync,
  getProductsAsync,
  verifySessionAsync,
  logOutAsync,
  activateOnboarding,
  checkOnboarding,
  getNoticeAsync,
  selectNoticeId,
  getBannersAsync,
  registerInAsync,
  getCuponsAsync,
  googleSignIn,
  forgetPassword,
  getCategoriesAsync,

} from '../actions/auth';
import { forgetPasswordCode } from '../service/user';

const initialState: AuthSliceState = {
  isAuth: false,
  isLoading: true,
  user: null,
  smarter: null,
  isOnboarding: false,
  notices: [],
  products: [],
  categories: [],
  offices: [],
  cupons: [],
  cupons2: [],
  cupons3: [],
  passwordToken: {
    token: "",
    code: ""
  },
  noticeId: null,
  banners: {
    home: [],
    cuponizate: [],
    argencompras: [],
  },
  loadingCupons: false,
  
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
      .addCase(googleSignIn.fulfilled, state => {
        state.isAuth = true;
      })
      .addCase(googleSignIn.rejected, state => {
        state.isAuth = false;
      })
      .addCase(getCuponsAsync.pending, state => {
        state.loadingCupons = true;  
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loadingCupons = false;
        state.cupons = action.payload.cupons;
        state.cupons2 = action.payload.cupons2;
        state.cupons3 = action.payload.cupons3;
        state.user = action.payload.user;
        state.smarter = action.payload.smarter;
      })
      .addCase(getUserAsync.rejected, state => {
        state.loadingCupons = false;
        state.cupons = [];
        state.cupons2 = [];
        state.cupons3 = [];
        state.isAuth = false;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductsAsync.rejected, state => {
        state.products = [];
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getCategoriesAsync.rejected, state => {
        state.categories = [];
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
      .addCase(getCuponsAsync.fulfilled, (state, action) => { 
        const { cupons, cupons2, cupons3 } = action.payload;
        state.loadingCupons = false;
        state.cupons = cupons;
        state.cupons2 = cupons2;
        state.cupons3 = cupons3;
      })
      .addCase(getCuponsAsync.rejected, state => {
        state.loadingCupons = false;
        state.cupons = [];
        state.cupons2 = [];
        state.cupons3 = [];
      })
      .addCase(selectNoticeId, (state, action) => {
        state.noticeId = action.payload;
      })
      .addCase(getBannersAsync.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.passwordToken.token = action.payload;
      })
      .addCase(forgetPasswordCode.fulfilled, (state, action) => {
        state.passwordToken.code = action.payload;
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
  offices: IOffice[];
  products: any[];
  categories: any[];
  cupons: any[];
  cupons2: any[];
  cupons3: any[];
  passwordToken: {
    token: string,
    code: string
  };
  noticeId: number | null;
  banners: {
    home: IBanner[];
    cuponizate: IBanner[];
    argencompras: IBanner[];
  };
  loadingCupons: Boolean,
}

export interface IOffice {
  id: number;
  name: string;
  image: string;
  address: string;
  schedules_1: string;
  schedules_2: string;
  whatsapp: string;
  phone: string;
  lat: string;
  lon: string;
}

export interface ISmarter {
  credits: ICredito[];
  offer: IOffer;
}

export interface ICredito {
  capital: number;
  fechaLiquidacion: string;
  estado: string;
  categoria: string;
}

export interface IOffer {
  resultado: string;
  maximoCapital: string;
  maximoCuota: string;
  consultaId: string;
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
  email_verified: boolean;
  cuponizate: boolean;
  points: number;
}
