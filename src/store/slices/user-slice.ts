import { createSlice } from '@reduxjs/toolkit';
import { UserI } from '../../types/user';
import { AuthStatus } from '../../types/const';
import { authorizeUser, loginUser, logOutUser } from '../api-actions/user';

export interface UserState {
  isAuthLoading: boolean;
  error: string | null;
  authorizationStatus: AuthStatus;
  user: UserI | null;
}

const initialState: UserState = {
  isAuthLoading: false,
  error: null,
  authorizationStatus: AuthStatus.Unknown,
  user: null
};

const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthStatus.Auth;
        state.isAuthLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload as string;
      })

      .addCase(authorizeUser.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthStatus.Auth;
        state.isAuthLoading = false;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logOutUser.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthStatus.Unknown;
        state.isAuthLoading = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default OffersSlice.reducer;
