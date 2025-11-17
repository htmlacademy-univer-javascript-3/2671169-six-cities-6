import { configureStore } from '@reduxjs/toolkit';
import OfferReducer from './slices/offers';

const store = configureStore({
  reducer: {
    offers: OfferReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
