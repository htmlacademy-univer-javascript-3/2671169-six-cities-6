import { makeFakeOffersList, makeFakeStore } from '../../../utils/mocs';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import OffersList from './offers-list';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component: OffersList', () => {
  let mockHistory: MemoryHistory;
  const mockHoverCard = vi.fn();
  const mockLeaveCard = vi.fn();

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
