import { useAppSelector } from '../../../hooks/redux';
import { AuthStatus } from '../../../const';
import ReviewForm from '../review-form/review-form';
import Review from '../review-item/review-item';
import { useMemo } from 'react';
interface ReviewsListProps {
  offerId: string;
}

export default function ReviewsList({ offerId }: ReviewsListProps) {
  const auth = useAppSelector((state) => state.user.authorizationStatus);
  const { reviews } = useAppSelector((state) => state.reviews);

  const sortedReviews = useMemo(() => [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10), [reviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {reviews.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      {auth !== AuthStatus.Unknown && <ReviewForm offerId={offerId} />}
    </section>
  );
}
