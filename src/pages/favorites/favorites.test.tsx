import { makeFakeFavorites, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import { AppRoute } from '../../const';

describe('Component: Favorites', () => {
  it('should render correctly', () => {
    const { mockOffers, mockFavorites } = makeFakeFavorites();
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers,
        favorites: mockFavorites,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Saved listing/i })).toBeInTheDocument();
  });

  it('should render an array of "favorites"', () => {
    const { mockOffers, mockFavorites } = makeFakeFavorites();
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers,
        favorites: mockFavorites,
      }
    }));

    render(withStoreComponent);

    const allFavorites = screen.getAllByTestId('favorites-test');
    const cityLink = screen.getByRole('link', { name: mockFavorites[0].city.name });

    expect(screen.getByText(mockFavorites[0].city.name)).toBeInTheDocument();
    expect(allFavorites.length).toEqual(mockFavorites.length);
    expect(cityLink).toBeInTheDocument();
    expect(cityLink).toHaveAttribute('href', '#');
  });

  it('should render footer logo link to "AppRoute.Root"', () => {
    const { mockOffers, mockFavorites } = makeFakeFavorites();
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers,
        favorites: mockFavorites,
      }
    }));

    render(withStoreComponent);
    const logoLink = screen.getByRole('link', { name: /6 cities/i });

    expect(logoLink).toHaveAttribute('href', AppRoute.Root);
  });
});
