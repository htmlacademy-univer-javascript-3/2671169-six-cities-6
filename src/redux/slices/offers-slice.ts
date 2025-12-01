import { getCurrentOffer, getNearPlaces, getOffers } from '../../api/offers';
import { changeFavoriteStatus, getFavorite } from '../../api/favorite';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getReviewsList, postReview } from '../../api/comments';
import { OfferI, PlaceCardI } from '../../types/offer-type';
import { ReviewI } from '../../types/reviews';

export interface OffersState {
  city: string;
  offers: PlaceCardI[];
  currentOffer: OfferI | null;
  nearPlaces: PlaceCardI[];
  favorites: PlaceCardI[];
  reviews: ReviewI[];
  isOffersLoading: boolean;
  isCurrentOfferLoading: boolean;
  isReviewsLoading: boolean;
  isFavoritesLoading: boolean;
  isNearbyLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  nearPlaces: [],
  favorites: [],
  reviews: [],
  isOffersLoading: false,
  isCurrentOfferLoading: false,
  isReviewsLoading: false,
  isFavoritesLoading: false,
  isNearbyLoading: false,
  error: null,
};

const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.isOffersLoading = true;
        state.error = null;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.isOffersLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentOffer.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.error = null;
      })
      .addCase(getCurrentOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(getCurrentOffer.rejected, (state, action) => {
        state.isCurrentOfferLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getNearPlaces.pending, (state) => {
        state.isNearbyLoading = true;
        state.error = null;
      })
      .addCase(getNearPlaces.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
        state.isNearbyLoading = false;
      })
      .addCase(getNearPlaces.rejected, (state, action) => {
        state.isNearbyLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getReviewsList.pending, (state) => {
        state.isReviewsLoading = true;
        state.error = null;
      })
      .addCase(getReviewsList.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(getReviewsList.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(postReview.pending, (state) => {
        state.isReviewsLoading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewsLoading = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getFavorite.pending, (state) => {
        state.isFavoritesLoading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.isFavoritesLoading = false;
        state.error = action.payload as string;
      })

      .addCase(changeFavoriteStatus.pending, (state) => {
        state.isFavoritesLoading = true;
        state.error = null;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        if (state.currentOffer && state.currentOffer.id === action.payload.id) {
          state.currentOffer.isFavorite = action.payload.isFavorite;
        }
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
          state.offers.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = true;
              return offer;
            }
            return offer;
          });
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
          state.offers.map((offer) => {
            if (offer.id === action.payload.id) {
              offer.isFavorite = false;
              return offer;
            }
            return offer;
          });
        }
        state.isFavoritesLoading = false;
      })
      .addCase(changeFavoriteStatus.rejected, (state, action) => {
        state.isFavoritesLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { changeCity } = OffersSlice.actions;
export default OffersSlice.reducer;
