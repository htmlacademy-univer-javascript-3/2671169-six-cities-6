import { withStore } from '../../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeOffersList, makeFakeStore } from '../../../utils/mocks';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const currentOffer = makeFakeOffersList()[0];
    const { withStoreComponent } = withStore(<ReviewForm offerId={currentOffer.id} />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('should enable submit button when rating and comment are valid', async () => {
    const currentOffer = makeFakeOffersList()[0];
    const { withStoreComponent } = withStore(<ReviewForm offerId={currentOffer.id} />, makeFakeStore());

    render(withStoreComponent);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByTestId('review-textarea');
    const ratingInput = screen.getByTestId('rating-5');

    expect(submitButton).toBeDisabled();

    const shortComment = 'short comment';
    userEvent.click(ratingInput);
    await userEvent.type(
      textarea,
      shortComment
    );
    expect(submitButton).toBeDisabled();
    expect(screen.getByDisplayValue(shortComment)).toBeInTheDocument();

    userEvent.clear(textarea);
    const validComment = 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.';
    await userEvent.type(
      textarea,
      validComment,
    );

    expect(screen.getByDisplayValue(validComment)).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});
