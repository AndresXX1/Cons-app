import { createSlice } from "@reduxjs/toolkit";

import {
  logInAsync,
  getUserAsync,
  verifySessionAsync,
  logOutAsync,
  activateOnboarding,
  checkOnboarding,
} from "../actions/auth";

const initialState: AuthSliceState = {
  isAuth: false,
  isLoading: true,
  user: null,
  isOnboarding: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(logInAsync.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(verifySessionAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(verifySessionAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logOutAsync.rejected, (state) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(activateOnboarding, (state) => {
        state.isOnboarding = true;
      })
      .addCase(checkOnboarding.fulfilled, (state, action) => {
        state.isOnboarding = action.payload;
      });
  },
});

export default authSlice.reducer;

export interface AuthSliceState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser | null;
  isOnboarding: boolean;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  address: string | null;
  email: string;
  avatar: string | null;
  role: string;
}
