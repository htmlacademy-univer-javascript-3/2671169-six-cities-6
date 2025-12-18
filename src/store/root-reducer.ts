import { combineReducers } from '@reduxjs/toolkit';
import ReviewReducer from './review-data/review-data';
import OfferReducer from './offers-data/offers-data';
import UserReducer from './user-data/user-data';

export const rootReducer = combineReducers({
  offers: OfferReducer,
  user: UserReducer,
  reviews: ReviewReducer,
});
