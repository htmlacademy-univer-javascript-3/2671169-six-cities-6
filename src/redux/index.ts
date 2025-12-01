import { configureStore } from '@reduxjs/toolkit';
import OfferReducer from './slices/offers-slice';
import UserReducer from './slices/user-slice';

const store = configureStore({
  reducer: {
    offers: OfferReducer,
    user: UserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
