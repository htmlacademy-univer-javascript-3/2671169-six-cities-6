import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffersList, makeFakeStore } from '../../utils/mocks';
import MainPage from './main-page';

describe('Component: MainPage', () => {
  it('should render correctly with offers list', () => {
    const mockOffers = makeFakeOffersList();
    const withHistoryComponent = withHistory(<MainPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      offers: {
        offers: mockOffers
      }
    }));

    render(withStoreComponent);

    expect(screen.getAllByTestId('offer-card').length).toEqual(mockOffers.length);
  });
});
