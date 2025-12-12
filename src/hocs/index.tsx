import { memo } from 'react';
import OffersList from '../components/offers/offers-list/offers-list';
import OfferCard from '../components/offers/offer-card/offer-card';
import ReviewsList from '../components/review/reviews-list/reviews-list';
import CitiesList from '../components/cities/cities-list/cities-list';
import MapComponent from '../components/map-component/map-component';

export const OffersListMemoized = memo(OffersList);
export const OfferCardMemoized = memo(OfferCard);
export const ReviewsListMemoized = memo(ReviewsList);
export const CitiesListMemoized = memo(CitiesList);
export const MapComponentMemoized = memo(MapComponent);
