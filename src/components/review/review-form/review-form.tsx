import React, { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { postReview } from '../../../store/api-actions/review';

const ratingTitles: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly'
};

export default function ReviewForm({ offerId }: { offerId: string }) {
  const dispatch = useAppDispatch();

  const { isFormSubmitting } = useAppSelector((state) => state.reviews);
  const { error } = useAppSelector((state) => state.reviews);

  const [formData, setFormData] = useState({ comment: '', rating: 0 });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postReview({ offerId, postData: formData }));
    setFormData({
      comment: '',
      rating: 0
    });
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
      data-testid="reviews-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleInputChange}
              disabled={isFormSubmitting}
              data-testid={`rating-${value}`}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={ratingTitles[value]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputChange}
        value={formData.comment}
        disabled={isFormSubmitting}
        data-testid="review-textarea"
      >
      </textarea>

      {error && <p className='reviews__error' style={{ color: 'red' }}>{error}</p>}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !Number(formData.rating)
            || formData.comment.length < 50
            || formData.comment.length > 300
          }
        >
          {isFormSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
