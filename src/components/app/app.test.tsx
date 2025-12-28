import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFavorites, makeFakeOffersList, makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthStatus } from '../../const';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    const cities = screen.getAllByTestId('city-list-span');

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(cities.length).toBe(6);
    expect(cities[0].textContent).toBe('Paris');
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByTestId('random-city-link')).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should render "Offer" when user navigate to "/offer/:offerId"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const mockOffers = makeFakeOffersList();
    mockOffers[0].isPremium = true;
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        currentOffer: mockOffers[0]
      }
    }));
    mockHistory.push(`/offers/${mockOffers[0].id}`);

    render(withStoreComponent);

    expect(screen.getByText(mockOffers[0].title)).toBeInTheDocument();
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { mockOffers, mockFavorites } = makeFakeFavorites();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth
      },
      offers: {
        offers: mockOffers,
        favorites: mockFavorites,
      }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    const favoritesRendered = screen.getAllByTestId('favorites-test');
    expect(screen.getByText(mockFavorites[0].title)).toBeInTheDocument();
    expect(favoritesRendered.length).toEqual(mockFavorites.length);
  });

  it('should render "NotFoundScreen" when user navigate to non-existing route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/unknown-route');

    render(withStoreComponent);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    const link = screen.getByRole('link', {
      name: /back to home page/i,
    });
    expect(link).toHaveAttribute('href', '/');
  });
});
