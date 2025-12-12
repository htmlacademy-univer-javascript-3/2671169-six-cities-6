import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { PostReviewProps, ReviewI } from '../../types/reviews';

export const getReviewsList = createAsyncThunk(
  '/get/reviews',
  async (offerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<ReviewI[]>(`/comments/${offerId}`);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);

export const postReview = createAsyncThunk(
  '/post/review',
  async ({ offerId, data }: PostReviewProps, { rejectWithValue }) => {
    try {
      const response = await api.post<ReviewI>(`/comments/${offerId}`, data);
      return response.data;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message: string } } }).response?.data?.message || 'Error';
      return rejectWithValue(errorMessage);
    }
  }
);
