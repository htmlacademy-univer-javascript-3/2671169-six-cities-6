import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PlaceCardI } from '../../types/offer-type';
import { ReviewI } from '../../types/review';

export interface OffersState {
    city: string
    offers: PlaceCardI[]
    favorites: PlaceCardI[]
    reviews: ReviewI[]
    isLoading: boolean
    error: string | null
};

const initialState: OffersState = {
    city: 'Paris',
    offers: [],
    favorites: [],
    reviews: [],
    isLoading: false,
    error: null
};

const OffersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        changeCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        getOffers: (state, action: PayloadAction<PlaceCardI[]>) => {
            state.offers = action.payload;
        },
        getFavorites: (state, action: PayloadAction<PlaceCardI[]>) => {
            state.favorites = action.payload;
        },
        getReviews: (state, action: PayloadAction<ReviewI[]>) => {
            state.reviews = action.payload;
        }
    },
});

export const { changeCity, getOffers, getFavorites, getReviews } = OffersSlice.actions;
export default OffersSlice.reducer;