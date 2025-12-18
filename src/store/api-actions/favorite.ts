import { ChangeFavoriteStatusProps } from '../../types/favorites';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlaceCardI } from '../../types/offer';
import { ApiRoute } from '../../const';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from '../../types/state';

export const getFavorite = createAsyncThunk<PlaceCardI[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/favorite',
  async (_, { extra: api }) => {
    const { data } = await api.get<PlaceCardI[]>(ApiRoute.Favorites);
    return data;
  }
);

export const changeFavoriteStatus = createAsyncThunk<PlaceCardI, ChangeFavoriteStatusProps, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/change/favorite',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<PlaceCardI>(`${ApiRoute.Favorites}/${offerId}/${status}`);
    return data;
  }
);
