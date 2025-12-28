import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffersList, makeFakeStore } from '../../utils/mocks';
import Offer from './offer';

describe('Component: Offer', () => {
  it('should render correctly with "offer" in state', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(<Offer />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        nearPlaces: mockOffers
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(/Other places in the neighborhood/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('near-places').length).toEqual(mockOffers.length);
  });
});
