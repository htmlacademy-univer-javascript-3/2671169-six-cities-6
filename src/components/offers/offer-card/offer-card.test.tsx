import { createMemoryHistory, MemoryHistory } from 'history';
import { makeFakeOffersList, makeFakeStore } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import OfferCard from './offer-card';

describe('Component: OfferCard', () => {
  let mockHistory: MemoryHistory;
  const mockHoverCard = vi.fn();
  const mockLeaveCard = vi.fn();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(
      <OfferCard
        offer={mockOffers[0]}
        cardClass='cities'
        onMouseOver={mockHoverCard}
        onMouseLeave={mockLeaveCard}
        dataTestId="offer-card-testid"
      />,
      mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const linkToCurrentOffer = screen.getByRole('link', { name: /Place image/i });

    expect(screen.getByTestId('offer-card-testid')).toBeInTheDocument();
    expect(linkToCurrentOffer).toHaveAttribute('href', `/offers/${mockOffers[0].id}`);
  });
});
