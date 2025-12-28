import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeOffersList, makeFakeStore } from '../../../utils/mocks';
import OffersList, { OffersListProps } from './offers-list';
import { withHistory, withStore } from '../../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: OffersList', () => {
  let mockHistory: MemoryHistory;
  const mockHoverCard: OffersListProps['onListItemHover'] = vi.fn();
  const mockLeaveCard: OffersListProps['onListItemBlur'] = vi.fn();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly with array of offers', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(
      <OffersList
        offers={mockOffers}
        cardClass=''
        onListItemHover={mockHoverCard}
        onListItemBlur={mockLeaveCard}
      />,
      mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId('offer-card').length).toEqual(mockOffers.length);
  });

  it('should call hover and blur handlers when user hover/blur "OfferCard"', async () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(
      <OffersList
        offers={mockOffers}
        cardClass=''
        onListItemHover={mockHoverCard}
        onListItemBlur={mockLeaveCard}
      />,
      mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    const offerCards = screen.getAllByTestId('offer-card');
    await userEvent.hover(offerCards[0]);
    expect(mockHoverCard).toBeCalledTimes(1);
    await userEvent.unhover(offerCards[0]);
    expect(mockLeaveCard).toBeCalledTimes(1);
  });
});
