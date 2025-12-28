import store from '../store';
import { AuthStatus } from '../const';
import { OfferI, PlaceCardI } from './offer';
import { ReviewI } from './reviews';
import { UserI } from './user';

export interface OffersState {
  city: string;
  offers: PlaceCardI[];
  currentOffer: OfferI | null;
  nearPlaces: PlaceCardI[];
  favorites: PlaceCardI[];
  isOffersLoading: boolean;
  isCurrentOfferLoading: boolean;
  isFavoritesLoading: boolean;
  isNearbyLoading: boolean;
  error: string | null;
}

export interface ReviewState {
    reviews: ReviewI[];
    isReviewsLoading: boolean;
    isFormSubmitting: boolean;
    error: string | null;
}

export interface UserState {
  isAuthLoading: boolean;
  error: string | null;
  authorizationStatus: AuthStatus;
  user: UserI | null;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
