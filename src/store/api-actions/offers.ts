import { OfferI, PlaceCardI } from '../../types/offer-type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

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

export const getCurrentOffer = createAsyncThunk(
  '/get/current-offer',
  async (offerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferI>(`/offers/${offerId}`);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getNearPlaces = createAsyncThunk(
  '/get/near-places',
  async (offerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<PlaceCardI[]>(`/offers/${offerId}/nearby`);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
