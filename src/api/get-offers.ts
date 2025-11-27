import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardI } from '../types/offer-type';
import api from './utils/axios';

export const getOffers = createAsyncThunk(
  '/get/offers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<PlaceCardI[]>('/offers');
      const result = response.data;
      return result;
    } catch (err: unknown) {
      const errorMessage =
                (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
