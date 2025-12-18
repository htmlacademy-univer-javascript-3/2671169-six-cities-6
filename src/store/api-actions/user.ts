import { AppDispatch, RootState } from '../../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';
import { UserI, UserPostData } from '../../types/user';
import { dropToken, saveToken } from '../../services/token';

export const loginUser = createAsyncThunk<UserI, UserPostData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/login',
  async (userData, { extra: api }) => {
    const response = await api.post<UserI>(ApiRoute.Login, userData);
    saveToken(response.data.token);
    return response.data;
  }
);

export const authorizeUser = createAsyncThunk<UserI, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/post/login',
  async (_, { extra: api }) => {
    const response = await api.get<UserI>(ApiRoute.Login);
    saveToken(response.data.token);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/delete/logout',
  async (_, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);
