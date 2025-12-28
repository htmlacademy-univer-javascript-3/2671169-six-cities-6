import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';
import OffersContainer from './offers-container';
import { makeFakeOffersList, makeFakeStore } from '../../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Component: OffersContainer', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(<OffersContainer />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers,
        city: 'Paris'
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(`${mockOffers.length} places to stay in Paris`)).toBeInTheDocument();
    expect(screen.getByTestId('places-sorting')).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-card').length).toEqual(mockOffers.length);
    expect(screen.getByTestId('map-section')).toBeInTheDocument();
  });

  it('should updates selected point on list item hover', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(<OffersContainer />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers,
        city: 'Paris'
      }
    }));

    render(withStoreComponent);

    const hoverFn = vi.fn();
    hoverFn(mockOffers[0]);
    expect(hoverFn).toHaveBeenCalledWith(mockOffers[0]);
  });
});
