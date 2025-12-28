import { makeFakeOffersList, makeFakeReviewsList, makeFakeUser } from '../../utils/mocks';
import { getCurrentOffer, getNearPlaces, getOffers } from './offers';
import { authorizeUser, loginUser, logoutUser } from './user';
import { changeFavoriteStatus, getFavorite } from './favorite';
import { getReviewsList, postReview } from './review';
import { ChangeFavoriteStatusProps } from '../../types/favorites';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { PostReviewProps } from '../../types/reviews';
import { UserPostData } from '../../types/user';
import { createAPI } from '../../services/api';
import { RootState } from '../../types/state';
import { ApiRoute } from '../../const';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ offers: { offers: [] } });
  });

  describe('authorizeUser', () => {
    it('should dispatch "authorizeUser.pending" and "authorizeUser.fulfilled" with thunk "authorizeUser"', async () => {
      const mockUser = makeFakeUser();
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, mockUser);

      await store.dispatch(authorizeUser());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchUserActionFulfiller = emittedActions.at(1) as ReturnType<typeof authorizeUser.fulfilled>;

      expect(actions).toEqual([
        authorizeUser.pending.type,
        authorizeUser.fulfilled.type
      ]);

      expect(fetchUserActionFulfiller.payload).toEqual(mockUser);
    });

    it('should dispatch "authorizeUser.pending" and "authorizeUser.rejected" with thunk "authorizeUser"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(authorizeUser());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        authorizeUser.pending.type,
        authorizeUser.rejected.type
      ]);
    });
  });

  describe('loginUser', () => {
    it('should dispatch "loginUser.pending" and "loginUser.fulfilled" with thunk "loginUser"', async () => {
      const fakeUser: UserPostData = { email: 'test@user.ru', password: '123' };
      const mockUser = makeFakeUser();
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, { mockUser, fakeServerReplay });

      await store.dispatch(loginUser(fakeUser));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const loginUserActionFulfiller = emittedActions.at(1) as ReturnType<typeof loginUser.fulfilled>;

      expect(actions).toEqual([
        loginUser.pending.type,
        loginUser.fulfilled.type
      ]);

      expect(loginUserActionFulfiller.payload).toEqual({ mockUser, fakeServerReplay });
    });

    it('should dispatch "loginUser.pending" and "loginUser.rejected" with thunk "loginUser"', async () => {
      const fakeUser: UserPostData = { email: 'test@user.ru', password: '123' };
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);

      await store.dispatch(loginUser(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginUser.pending.type,
        loginUser.rejected.type
      ]);

    });
  });

  describe('logoutUser', () => {
    it('should dispatch "logoutUser.pending" and "logoutUser.fulfilled" with thunk "logoutUser"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutUser());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutUser.pending.type,
        logoutUser.fulfilled.type
      ]);
    });
  });

  describe('getReviewsList', () => {
    it('should dispatch "getReviewsList.pending" and "getReviewsList.fulfilled" with thunk "getReviewsList"', async () => {
      const mockReviews = makeFakeReviewsList();
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${1}`).reply(200, mockReviews);

      await store.dispatch(getReviewsList('1'));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfiller = emittedActions.at(1) as ReturnType<typeof getReviewsList.fulfilled>;

      expect(actions).toEqual([
        getReviewsList.pending.type,
        getReviewsList.fulfilled.type
      ]);

      expect(fetchReviewsActionFulfiller.payload).toEqual(mockReviews);
    });

    it('should dispatch "getReviewsList.pending" and "getReviewsList.rejected" with thunk "getReviewsList"', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Reviews}/${1}`).reply(400);

      await store.dispatch(getReviewsList('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviewsList.pending.type,
        getReviewsList.rejected.type
      ]);
    });
  });

  describe('postReview', () => {
    it('should dispatch "postReview.pending" and "postReview.fulfilled" with thunk "postReview"', async () => {
      const mockReviews = makeFakeReviewsList();
      const fakeReview: PostReviewProps = {
        offerId: '1',
        postData: {
          comment: '123',
          rating: 4,
        }
      };
      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${1}`).reply(200, mockReviews[0]);

      await store.dispatch(postReview(fakeReview));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const PostReviewActionFulfiller = emittedActions.at(1) as ReturnType<typeof postReview.fulfilled>;

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type
      ]);

      expect(PostReviewActionFulfiller.payload).toEqual(mockReviews[0]);
    });

    it('should dispatch "postReview.pending" and "postReview.rejected" with thunk "postReview"', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Reviews}/${1}`).reply(400);

      const fakeReview: PostReviewProps = {
        offerId: '1',
        postData: {
          comment: '123',
          rating: 4,
        }
      };

      await store.dispatch(postReview(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type
      ]);
    });
  });

  describe('getOffers', () => {
    it('should dispatch "getOffers.pending" and "getOffers.fulfilled" with thunk "getOffers"', async () => {
      const mockOffers = makeFakeOffersList();
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(getOffers());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfiller = emittedActions.at(1) as ReturnType<typeof getOffers.fulfilled>;

      expect(actions).toEqual([
        getOffers.pending.type,
        getOffers.fulfilled.type
      ]);

      expect(fetchOffersActionFulfiller.payload).toEqual(mockOffers);
    });

    it('should dispatch "getOffers.pending" and "getOffers.rejected" with thunk "getOffers"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400);

      await store.dispatch(getOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffers.pending.type,
        getOffers.rejected.type
      ]);
    });
  });

  describe('getCurrentOffer', () => {
    it('should dispatch "getCurrentOffer.pending" and "getCurrentOffer.fulfilled" with thunk "getCurrentOffer"', async () => {
      const mockOffers = makeFakeOffersList();
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${1}`).reply(200, mockOffers[0]);

      await store.dispatch(getCurrentOffer('1'));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchCurrentOfferActionFulfiller = emittedActions.at(1) as ReturnType<typeof getCurrentOffer.fulfilled>;

      expect(actions).toEqual([
        getCurrentOffer.pending.type,
        getCurrentOffer.fulfilled.type
      ]);

      expect(fetchCurrentOfferActionFulfiller.payload).toEqual(mockOffers[0]);
    });

    it('should dispatch "getCurrentOffer.pending" and "getCurrentOffer.rejected" with thunk "getCurrentOffer"', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${1}`).reply(400);

      await store.dispatch(getCurrentOffer('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getCurrentOffer.pending.type,
        getCurrentOffer.rejected.type
      ]);
    });
  });

  describe('getNearPlaces', () => {
    it('should dispatch "getNearPlaces.pending" and "getNearPlaces.fulfilled" with thunk "getNearPlaces"', async () => {
      const mockOffers = makeFakeOffersList();
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${1}/nearby`).reply(200, mockOffers);

      await store.dispatch(getNearPlaces('1'));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchNearPlacesActionFulfiller = emittedActions.at(1) as ReturnType<typeof getNearPlaces.fulfilled>;

      expect(actions).toEqual([
        getNearPlaces.pending.type,
        getNearPlaces.fulfilled.type
      ]);

      expect(fetchNearPlacesActionFulfiller.payload).toEqual(mockOffers);
    });

    it('should dispatch "getNearPlaces.pending" and "getNearPlaces.rejected" with thunk "getNearPlaces"', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${1}/nearby`).reply(400);

      await store.dispatch(getNearPlaces('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getNearPlaces.pending.type,
        getNearPlaces.rejected.type
      ]);
    });
  });

  describe('getFavorite', () => {
    it('should dispatch "getFavorite.pending" and "getFavorite.fulfilled" with thunk "getFavorite"', async () => {
      const mockOffers = makeFakeOffersList();
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, mockOffers);

      await store.dispatch(getFavorite());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfiller = emittedActions.at(1) as ReturnType<typeof getFavorite.fulfilled>;

      expect(actions).toEqual([
        getFavorite.pending.type,
        getFavorite.fulfilled.type
      ]);

      expect(fetchFavoritesActionFulfiller.payload).toEqual(mockOffers);
    });

    it('should dispatch "getFavorite.pending" and "getFavorite.rejected" with thunk "getFavorite"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(400);

      await store.dispatch(getFavorite());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavorite.pending.type,
        getFavorite.rejected.type
      ]);
    });
  });

  describe('changeFavoriteStatus', () => {
    it('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.fulfilled" with thunk "changeFavoriteStatus"', async () => {
      const mockOffers = makeFakeOffersList();

      const newStatus = Number(!mockOffers[0].isFavorite);
      const fakeChangeProps: ChangeFavoriteStatusProps = {
        offerId: mockOffers[0].id,
        status: newStatus,
      };

      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorites}/${fakeChangeProps.offerId}/${fakeChangeProps.status}`)
        .reply(200, mockOffers[0]);

      await store.dispatch(changeFavoriteStatus(fakeChangeProps));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const changeFavoriteActionFulfiller = emittedActions.at(1) as ReturnType<typeof changeFavoriteStatus.fulfilled>;

      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.fulfilled.type
      ]);

      expect(changeFavoriteActionFulfiller.payload).toEqual(mockOffers[0]);
    });

    it('should dispatch "changeFavoriteStatus.pending" and "changeFavoriteStatus.rejected" with thunk "changeFavoriteStatus"', async () => {
      const mockOffers = makeFakeOffersList();

      const newStatus = Number(!mockOffers[0].isFavorite);
      const fakeChangeProps: ChangeFavoriteStatusProps = {
        offerId: mockOffers[0].id,
        status: newStatus,
      };

      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorites}/${fakeChangeProps.offerId}/${fakeChangeProps.status}`)
        .reply(400);

      await store.dispatch(changeFavoriteStatus(fakeChangeProps));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.rejected.type
      ]);
    });
  });
});
