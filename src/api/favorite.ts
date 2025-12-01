import { ChangeFavoriteStatusProps } from '../types/favorites';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardI } from '../types/offer-type';
import api from './utils/axios';

export const getFavorite = createAsyncThunk(
  '/get/favorite',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<PlaceCardI[]>('/favorite');
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const changeFavoriteStatus = createAsyncThunk(
  '/change/favorite',
  async ({ offerId, status }: ChangeFavoriteStatusProps, { rejectWithValue }) => {
    try {
      const response = await api.post<PlaceCardI>(`/favorite/${offerId}/${status}`);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
