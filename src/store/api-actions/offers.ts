import { OfferI, PlaceCardI } from '../../types/offer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { AppDispatch, RootState } from '../../types/state';
import { AxiosInstance } from 'axios';

export const getOffers = createAsyncThunk<PlaceCardI[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/offers',
  async (_, { extra: api }) => {
    const { data } = await api.get<PlaceCardI[]>(ApiRoute.Offers);
    return data;
  }
);

export const getCurrentOffer = createAsyncThunk<OfferI, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/current-offer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferI>(`${ApiRoute.Offers}/${offerId}`);
    return data;
  }
);

export const getNearPlaces = createAsyncThunk<PlaceCardI[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  '/get/near-places',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<PlaceCardI[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);
