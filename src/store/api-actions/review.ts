import { PostReviewProps, ReviewI } from '../../types/reviews';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { AppDispatch, RootState } from '../../types/state';
import { AxiosInstance } from 'axios';

export const getReviewsList = createAsyncThunk<ReviewI[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/reviews',
  async (offerId: string, { extra: api }) => {
    const { data } = await api.get<ReviewI[]>(`${ApiRoute.Reviews}/${offerId}`);
    return data;
  }
);

export const postReview = createAsyncThunk<ReviewI, PostReviewProps, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/post/review',
  async ({ offerId, postData }, { extra: api }) => {
    const { data } = await api.post<ReviewI>(`${ApiRoute.Reviews}/${offerId}`, postData);
    return data;
  }
);
