import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PlaceCardI } from '../../types/offer-type';
import { ReviewI } from '../../types/reviews';
import { getOffers } from '../../api/get-offers';
import { authorizeUser, loginUser } from '../../api/login';
import { UserI } from '../../types/user';

export interface OffersState {
    city: string;
    offers: PlaceCardI[];
    favorites: PlaceCardI[];
    reviews: ReviewI[];
    isLoading: boolean;
    error: string | null;
    authorizationStatus: boolean;
    user: UserI | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  favorites: [],
  reviews: [],
  isLoading: false,
  error: null,
  authorizationStatus: false,
  user: null
};

const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    getFavorites: (state, action: PayloadAction<PlaceCardI[]>) => {
      state.favorites = action.payload;
    },
    getReviews: (state, action: PayloadAction<ReviewI[]>) => {
      state.reviews = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOffers.fulfilled, (state, action: PayloadAction<PlaceCardI[]>) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authorizationStatus = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(authorizeUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authorizeUser.fulfilled, (state, action: PayloadAction<UserI>) => {
        state.user = action.payload;
        state.authorizationStatus = true;
        state.isLoading = false;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { changeCity, getFavorites, getReviews } = OffersSlice.actions;
export default OffersSlice.reducer;
