import { getReviewsList, postReview } from '../api-actions/review';
import { createSlice } from '@reduxjs/toolkit';
import { ReviewState } from '../../types/state';

const initialState: ReviewState = {
  reviews: [],
  isReviewsLoading: false,
  isFormSubmitting: false,
  error: null,
};

export const ReviewSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsList.pending, (state) => {
        state.isReviewsLoading = true;
        state.error = null;
      })
      .addCase(getReviewsList.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(getReviewsList.rejected, (state, action) => {
        state.isReviewsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(postReview.pending, (state) => {
        state.isFormSubmitting = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isFormSubmitting = false;
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  }
});

export default ReviewSlice.reducer;
