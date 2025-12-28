import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeUser } from '../../utils/mocks';
import { ApiRoute, AppRoute, AuthStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../store/api-actions/api-actions.test';
import { logoutUser } from '../../store/api-actions/user';

describe('Component: Header', () => {
  it('should render correctly when authorization status is "Unknown" or "NotAuth"', () => {
    const withHistoryComponent = withHistory(<Header />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.NotAuth,
      }
    }));
    render(withStoreComponent);

    const signInLink = screen.getByRole('link', { name: /sign in/i });

    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', AppRoute.Login);
  });

  it('should render correctly when authorization status is "Auth"', () => {
    const withHistoryComponent = withHistory(<Header />);
    const mockUser = makeFakeUser();
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
      }
    }));

    render(withStoreComponent);

    const signOutLink = screen.getByRole('link', { name: /sign out/i });
    const favoritesLink = screen.getByRole('link', { name: new RegExp(mockUser.email, 'i') });

    expect(signOutLink).toBeInTheDocument();
    expect(signOutLink).toHaveAttribute('href', AppRoute.Root);
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute('href', AppRoute.Favorites);
  });

  it('should dispatch "logoutUser" when user click sign out button', async () => {
    const withHistoryComponent = withHistory(<Header />);
    const mockUser = makeFakeUser();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
      }
    }));
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);

    render(withStoreComponent);
    const signOutLink = screen.getByRole('link', { name: /sign out/i });

    await userEvent.click(signOutLink);

    const actions = extractActionsTypes(mockStore.getActions())
      .filter((type) => type.startsWith('/delete/logout'));

    expect(actions).toEqual([
      logoutUser.pending.type,
      logoutUser.fulfilled.type
    ]);
  });
});
