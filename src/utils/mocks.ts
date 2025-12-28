import { AuthStatus } from '../const';
import { OfferI, PointI } from '../types/offer';
import { ReviewI } from '../types/reviews';
import { OffersState, ReviewState, RootState, UserState } from '../types/state';
import { UserI } from '../types/user';

export const makeFakeReviewsList = (): ReviewI[] => new Array(3).fill(null).map(() => (
  {
    id: '1',
    date: '2025-12-01T12:00:00.000Z',
    user: {
      id: '1',
      name: 'John',
      avatarUrl: 'https://example.com/avatar.jpg',
      isPro: false,
      email: '',
      token: '',
    },
    comment: 'abc',
    rating: 5,
  }
));

export const makeFakeOffersList = (): OfferI[] => {
  let id = 0;
  function generateOffer() {
    return {
      id: String(id++),
      title: 'abc',
      type: '',
      price: 200,
      city: {
        name: 'Paris',
        location: {
          latitude: 1,
          longitude: 1,
          zoom: 1,
        },
      },
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      },
      isFavorite: false,
      isPremium: false,
      rating: 5,
      previewImage: '',
      description: 'some description',
      bedrooms: 2,
      goods: [],
      host: {
        id: '1',
        name: '',
        avatarUrl: '',
        isPro: false,
      },
      images: [],
      maxAdults: 2,
    };
  }
  return new Array(3).fill(null).map(() => (
    generateOffer()
  ));
};

export const makeFakeFavorites = () => {
  const mockOffers = makeFakeOffersList();
  const favoriteId = Number(mockOffers[mockOffers.length - 1].id) + 1;
  const favorite = {
    id: String(favoriteId),
    title: 'a',
    type: '',
    price: 200,
    city: {
      name: 'Paris',
      location: {
        latitude: 1,
        longitude: 1,
        zoom: 1,
      },
    },
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: '',
    description: 'some description',
    bedrooms: 2,
    goods: [],
    host: {
      id: '1',
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    images: [],
    maxAdults: 2,
  };
  mockOffers.push(favorite);
  const mockFavorites = [favorite];
  return {
    mockOffers,
    mockFavorites
  };
};

export const makeFakeUser = (): UserI => ({
  id: '1',
  name: '',
  avatarUrl: '',
  isPro: false,
  email: 'test@tes.ru',
  token: '',
});

export const makeFakePoints = (): PointI[] => new Array(3).fill(null).map(() => (
  {
    latitude: 43.123,
    longitude: 40.456,
    zoom: 10,
  }
));

export const makeFakeUserState = (
  overrides?: Partial<UserState>
): UserState => ({
  authorizationStatus: AuthStatus.NotAuth,
  user: null,
  isAuthLoading: false,
  error: null,
  ...overrides,
});

export const makeFakeOffersState = (
  overrides?: Partial<OffersState>
): OffersState => ({
  city: 'Paris',
  offers: [],
  currentOffer: null,
  nearPlaces: [],
  favorites: [],
  isOffersLoading: false,
  isCurrentOfferLoading: false,
  isFavoritesLoading: false,
  isNearbyLoading: false,
  error: null,
  ...overrides,
});

export const makeFakeReviewsState = (
  overrides?: Partial<ReviewState>
): ReviewState => ({
  reviews: [],
  isFormSubmitting: false,
  isReviewsLoading: false,
  error: null,
  ...overrides
});

export type RootStateOverrides = {
  user?: Partial<UserState>;
  offers?: Partial<OffersState>;
  reviews?: Partial<ReviewState>;
};

export const makeFakeStore = (
  overrides?: RootStateOverrides
): RootState => ({
  user: makeFakeUserState(overrides?.user),
  offers: makeFakeOffersState(overrides?.offers),
  reviews: makeFakeReviewsState(overrides?.reviews)
});
