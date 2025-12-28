import { makeFakeOffersList, makeFakePoints, makeFakeStore } from '../../../utils/mocks';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { ApiRoute, AuthStatus } from '../../../const';
import OfferBody from './offer-body';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../../store/api-actions/api-actions.test';
import { changeFavoriteStatus } from '../../../store/api-actions/favorite';

describe('Component: OfferBody', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const mockPoints = makeFakePoints();
    const mockCurrentOffer = makeFakeOffersList()[0];
    const withHistoryComponent = withHistory(
      <OfferBody
        points={mockPoints}
        selectedPoint={mockPoints[0]}
        currentOffer={mockCurrentOffer}
      />,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(mockCurrentOffer.title)).toBeInTheDocument();
    expect(screen.getByTestId('map-section')).toBeInTheDocument();
  });

  it('should not render "ReviewForm" when user is not authorized', () => {
    const mockPoints = makeFakePoints();
    const mockCurrentOffer = makeFakeOffersList()[0];
    const withHistoryComponent = withHistory(
      <OfferBody
        points={mockPoints}
        selectedPoint={mockPoints[0]}
        currentOffer={mockCurrentOffer}
      />,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Unknown,
      }
    }));

    render(withStoreComponent);

    expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
  });

  it('should render "ReviewForm" when user is authorized', () => {
    const mockPoints = makeFakePoints();
    const mockCurrentOffer = makeFakeOffersList()[0];
    const withHistoryComponent = withHistory(
      <OfferBody
        points={mockPoints}
        selectedPoint={mockPoints[0]}
        currentOffer={mockCurrentOffer}
      />,
      mockHistory
    );
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      }
    }));

    render(withStoreComponent);

    expect(screen.queryByTestId('reviews-form')).toBeInTheDocument();
  });

  it('should change "favorite" status when user click on button', async () => {
    const mockPoints = makeFakePoints();
    const mockOffers = makeFakeOffersList();
    const mockCurrentOffer = mockOffers[0];

    const withHistoryComponent = withHistory(
      <OfferBody
        points={mockPoints}
        selectedPoint={mockPoints[0]}
        currentOffer={mockCurrentOffer}
      />,
      mockHistory
    );
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      },
      offers: {
        offers: mockOffers,
      }
    }));
    const newStatus = Number(!mockOffers[0].isFavorite);
    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockCurrentOffer.id}/${newStatus}`).reply(201);

    render(withStoreComponent);

    const changeStatusButton = screen.getByRole('button', { name: /To bookmarks/i });
    expect(changeStatusButton).not.toHaveClass('offer__bookmark-button--active');

    await userEvent.click(changeStatusButton);

    const actions = extractActionsTypes(mockStore.getActions())
      .filter((type) => type.startsWith('/change/favorite/'));

    expect(actions).toEqual([
      changeFavoriteStatus.pending.type,
      changeFavoriteStatus.fulfilled.type
    ]);
  });
});
