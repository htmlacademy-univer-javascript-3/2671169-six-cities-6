import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserI } from '../../types/user';
import api from '../../api/axios';

export const loginUser = createAsyncThunk(
  '/get/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<UserI>('/login', data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const authorizeUser = createAsyncThunk(
  '/post/login',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<UserI>('/login');
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logOutUser = createAsyncThunk(
  '/delete/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/logout');
      localStorage.removeItem('token');
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
