import { getCurrentOffer, getNearPlaces, getOffers } from '../api-actions/offers';
import { makeFakeFavorites, makeFakeOffersList } from '../../utils/mocks';
import { changeFavoriteStatus, getFavorite } from '../api-actions/favorite';
import { changeCity, OffersSlice } from './offers-data';
import { OffersState } from '../../types/state';

describe('Offers slice', () => {
  const offersState: OffersState = {
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
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = OffersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(offersState);
  });

  it('should return updated state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...offersState, city: 'Moscow' };

    const result = OffersSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change "city" from "Paris" to "Moscow"', () => {
    const action = {
      type: changeCity,
      payload: 'Moscow'
    };

    const result = OffersSlice.reducer(undefined, action);
    expect(result.city).toBe('Moscow');
  });

  describe('getOffers', () => {
    it('should return "isOffersLoading" to "true", "error" to "null" with "getReviewsList.pending"', () => {
      const expectedState = { ...offersState, isOffersLoading: true };
      const result = OffersSlice.reducer(undefined, getOffers.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isOffersLoading" to "false", "error" to "error.message" with "getReviewsList.rejected"', () => {
      const action = {
        type: getOffers.rejected,
        payload: 'Failed to load offers'
      };
      const expectedState = { ...offersState, error: 'Failed to load offers' };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return "offers" to array with offers, "error" to "null" with "getReviewsList.fulfilled"', () => {
      const mockOffers = makeFakeOffersList();
      const action = {
        type: getOffers.fulfilled,
        payload: [mockOffers]
      };
      const expectedState = { ...offersState, offers: [mockOffers] };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('getCurrentOffer', () => {
    it('should return "isCurrentOfferLoading" to "true", "error" to "null" with "getCurrentOffer.pending"', () => {
      const expectedState = { ...offersState, isCurrentOfferLoading: true };
      const result = OffersSlice.reducer(undefined, getCurrentOffer.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isCurrentOfferLoading" to "false", "error" to "error.message" with "getCurrentOffer.rejected"', () => {
      const action = {
        type: getCurrentOffer.rejected,
        payload: 'Failed to load offer'
      };
      const expectedState = { ...offersState, error: 'Failed to load offer' };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should add offer to "offers", return currentOffer with offer, set "error" to "null" with "getCurrentOffer.fulfilled"', () => {
      const mockOffers = makeFakeOffersList();
      const action = {
        type: getCurrentOffer.fulfilled,
        payload: mockOffers[0]
      };
      const expectedState = { ...offersState, currentOffer: mockOffers[0] };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('getNearPlaces', () => {
    it('should return "isNearbyLoading" to "true", "error" to "null" with "getNearPlaces.pending"', () => {
      const expectedState = { ...offersState, isNearbyLoading: true };
      const result = OffersSlice.reducer(undefined, getNearPlaces.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isNearbyLoading" to "false", "error" to "error.message" with "getNearPlaces.rejected"', () => {
      const action = {
        type: getNearPlaces.rejected,
        payload: 'Failed to load offer'
      };
      const expectedState = { ...offersState, error: 'Failed to load offer' };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return "nearPlaces" to array with nearPlaces, "error" to "null" with "getNearPlaces.fulfilled"', () => {
      const mockOffers = makeFakeOffersList();
      const action = {
        type: getNearPlaces.fulfilled,
        payload: [mockOffers]
      };
      const expectedState = { ...offersState, nearPlaces: [mockOffers] };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('getFavorite', () => {
    it('should return "isFavoritesLoading" to "true", "error" to "null" with "getFavorite.pending"', () => {
      const expectedState = { ...offersState, isFavoritesLoading: true };
      const result = OffersSlice.reducer(undefined, getFavorite.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isFavoritesLoading" to "false", "error" to "error.message" with "getFavorite.rejected"', () => {
      const action = {
        type: getFavorite.rejected,
        payload: 'Failed to load offer'
      };
      const expectedState = { ...offersState, error: 'Failed to load offer' };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should return "favorites" to array with favorites offers, "error" to "null" with "getFavorite.fulfilled"', () => {
      const mockOffers = makeFakeOffersList();
      const action = {
        type: getFavorite.fulfilled,
        payload: [mockOffers]
      };
      const expectedState = { ...offersState, favorites: [mockOffers] };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });
  });

  describe('changeFavoriteStatus', () => {
    it('should return "isFavoritesLoading" to "true", "error" to "null" with "changeFavoriteStatus.pending"', () => {
      const expectedState = { ...offersState, isFavoritesLoading: true };
      const result = OffersSlice.reducer(undefined, changeFavoriteStatus.pending);
      expect(result).toEqual(expectedState);
    });

    it('should return "isFavoritesLoading" to "false", "error" to "error.message" with "changeFavoriteStatus.rejected"', () => {
      const action = {
        type: changeFavoriteStatus.rejected,
        payload: 'Failed to load offer'
      };
      const expectedState = { ...offersState, error: 'Failed to load offer' };

      const result = OffersSlice.reducer(undefined, action);
      expect(result).toEqual(expectedState);
    });

    it('should remove favorite status of offer with "changeFavoriteStatus.fulfilled"', () => {
      const { mockOffers, mockFavorites } = makeFakeFavorites();
      const initialState = { ...offersState, offers: mockOffers, favorites: mockFavorites};

      const changedFavorite = { ...mockFavorites[0], isFavorite: false};
      const action = {
        type: changeFavoriteStatus.fulfilled,
        payload: changedFavorite
      };

      mockOffers[mockOffers.length - 1].isFavorite = false;
      const expectedState = { ...offersState, favorites: mockFavorites.slice(1), offers: mockOffers };

      const result = OffersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });

    it('should add favorite status of offer with "changeFavoriteStatus.fulfilled"', () => {
      const { mockOffers, mockFavorites } = makeFakeFavorites();
      const initialState = { ...offersState, offers: mockOffers, favorites: mockFavorites};

      const changedFavorite = { ...mockOffers[0], isFavorite: true};
      const action = {
        type: changeFavoriteStatus.fulfilled,
        payload: changedFavorite
      };

      mockOffers[0].isFavorite = true;
      const expectedState = { ...offersState, favorites: [...mockFavorites, mockOffers[0]], offers: mockOffers };

      const result = OffersSlice.reducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });
});
