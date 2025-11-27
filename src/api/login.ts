import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './utils/axios';
import { UserI } from '../types/user';

export const loginUser = createAsyncThunk(
  '/get/login',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<UserI>('/login');
      const result = response.data;
      return result;
    } catch (err: unknown) {
      const errorMessage =
                (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const authorizeUser = createAsyncThunk(
  '/post/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<UserI>('/login', data);
      const result = response.data;
      return result;
    } catch (err: unknown) {
      const errorMessage =
                (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
