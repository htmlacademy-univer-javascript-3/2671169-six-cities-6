import { memo } from 'react';
import OffersList from '../components/offers/offers-list/offers-list';
import OfferCard from '../components/offers/offer-card/offer-card';
import ReviewsList from '../components/review/reviews-list/reviews-list';

export const OffersListMemoized = memo(OffersList);
export const OfferCardMemoized = memo(OfferCard);
export const ReviewsListMemoized = memo(ReviewsList);
