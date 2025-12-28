import { render, screen } from '@testing-library/react';
import Review from './review-item';
import { ReviewI } from '../../../types/reviews';
import { makeFakeReviewsList } from '../../../utils/mocks';

describe('Review', () => {
  const mockReview: ReviewI = makeFakeReviewsList()[0];
  const formattedDate = new Date(mockReview.date).toLocaleString(
    'en-US',
    { month: 'long', year: 'numeric' }
  );

  it('should render user name and comment', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it('should render user avatar with correct attributes', () => {
    render(<Review review={mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar') ;

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockReview.user.avatarUrl);
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');
  });

  it('should render rating with correct width style', () => {
    render(<Review review={mockReview} />);
    const stars = screen.getByTestId('reviews__stars');

    expect(stars).toHaveStyle({ width: `${(mockReview.rating * 20)}%` });
  });

  it('should render formatted review date', () => {
    render(<Review review={mockReview} />);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('should render datetime attribute correctly', () => {
    render(<Review review={mockReview} />);
    const timeElement = screen.getByText(formattedDate);

    expect(timeElement).toHaveAttribute('datetime', mockReview.date);
  });
});
