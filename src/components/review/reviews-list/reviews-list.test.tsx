import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeOffersList, makeFakeReviewsList, makeFakeStore } from '../../../utils/mocks';
import ReviewsList from './reviews-list';
import { AuthStatus } from '../../../const';

describe('Component: ReviewsList', () => {
  it('should render correctly with reviews list', () => {
    const mockReviews = makeFakeReviewsList();
    const currentOffer = makeFakeOffersList()[0];
    const withHistoryComponent =
            withHistory(
              <ReviewsList offerId={currentOffer.id} />
            );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      reviews: {
        reviews: mockReviews
      }
    }));

    render(withStoreComponent);

    expect(screen.getAllByTestId('review-item').length).toEqual(mockReviews.length);
  });

  it('should not render "ReviewForm" if user is not authorized', () => {
    const mockReviews = makeFakeReviewsList();
    const currentOffer = makeFakeOffersList()[0];
    const withHistoryComponent =
            withHistory(
              <ReviewsList offerId={currentOffer.id} />
            );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Unknown
      },
      reviews: {
        reviews: mockReviews
      }
    }));

    render(withStoreComponent);
    const form = screen.queryByRole('form');
    expect(form).not.toBeInTheDocument();
  });

  it('should render "ReviewForm" if user is authorized', () => {
    const mockReviews = makeFakeReviewsList();
    const currentOffer = makeFakeOffersList()[0];
    const withHistoryComponent =
            withHistory(
              <ReviewsList offerId={currentOffer.id} />
            );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthStatus.Auth
      },
      reviews: {
        reviews: mockReviews
      }
    }));

    render(withStoreComponent);

    const form = screen.getByTestId('reviews-form');
    expect(form).toBeInTheDocument();
  });
});
