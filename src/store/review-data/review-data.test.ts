import { getReviewsList, postReview } from '../api-actions/review';
import { makeFakeReviewsList } from '../../utils/mocks';
import { ReviewSlice } from '../review-data/review-data';
import { ReviewState } from '../../types/state';

describe('Review slice', () => {
  const reviewState: ReviewState = {
    reviews: [],
    isFormSubmitting: false,
    isReviewsLoading: false,
    error: null,
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = ReviewSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(reviewState);
  });

  it('should return updated state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...reviewState, isReviewsLoading: true };

    const result = ReviewSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('getReviewsList', () => {
    it('should return "isReviewsLoading" to "true", "error" to "null" with "getReviewsList.pending"', () => {
      const expectedState = { ...reviewState, isReviewsLoading: true };

      const result = ReviewSlice.reducer(undefined, getReviewsList.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return "isReviewsLoading" to "false", "error" to "error.message" with "getReviewsList.rejected"', () => {
      const action = {
        type: getReviewsList.rejected,
        payload: 'Failed to load reviews',
      };
      const expectedState = { ...reviewState, error: 'Failed to load reviews' };

      const result = ReviewSlice.reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

    it('should return "reviews" to array with reviews, "error" to "null" with "getReviewsList.fulfilled"', () => {
      const mockReviews = makeFakeReviewsList();
      const action = {
        type: getReviewsList.fulfilled,
        payload: [mockReviews]
      };
      const expectedState = { ...reviewState, reviews: [mockReviews] };

      const result = ReviewSlice.reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('postReview', () => {
    it('should return "isReviewsLoading" to "true", "error" to "null" with "postReview.pending"', () => {
      const expectedState = { ...reviewState, isFormSubmitting: true };

      const result = ReviewSlice.reducer(undefined, postReview.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return "isReviewsLoading" to "false", "error" to "error.message" with "postReview.rejected"', () => {
      const action = {
        type: postReview.rejected,
        payload: 'Failed to post reviews',
      };
      const expectedState = { ...reviewState, error: 'Failed to post reviews' };

      const result = ReviewSlice.reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

    it('should return add to "reviews" a new review and set "error" to "null" with "postReview.fulfilled"', () => {
      const mockReviews = makeFakeReviewsList();
      const action = {
        type: postReview.fulfilled,
        payload: mockReviews[0]
      };
      const expectedState = { ...reviewState, reviews: [mockReviews[0]] };

      const result = ReviewSlice.reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });
  });
});
