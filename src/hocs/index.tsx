import { memo } from 'react';
import MapComponent from '../components/map-component/map-component';
import ReviewsList from '../components/review/reviews-list/reviews-list';
import OffersList from '../components/offers/offers-list/offers-list';
import CitiesList from '../components/cities-list/cities-list';
import OfferCard from '../components/offers/offer-card/offer-card';
import OfferBody from '../components/offers/offer-body/offer-body';

export const OffersListMemoized = memo(OffersList);
export const OfferCardMemoized = memo(OfferCard);
export const ReviewsListMemoized = memo(ReviewsList);
export const CitiesListMemoized = memo(CitiesList);
export const MapComponentMemoized = memo(MapComponent);
export const OfferBodyMemoized = memo(OfferBody);
