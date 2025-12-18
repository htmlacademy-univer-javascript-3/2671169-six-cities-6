import { authorizeUser, loginUser, logoutUser } from '../api-actions/user';
import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from '../../const';
import { UserState } from '../../types/state';

const initialState: UserState = {
  isAuthLoading: false,
  error: null,
  authorizationStatus: AuthStatus.Unknown,
  user: null
};

export const UsersSlice = createSlice({
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

      .addCase(logoutUser.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthStatus.Unknown;
        state.isAuthLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default UsersSlice.reducer;
