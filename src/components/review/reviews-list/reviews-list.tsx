import { useAppSelector } from '../../../hooks/redux';
import { AuthStatus } from '../../../const';
import { ReviewI } from '../../../types/reviews';
import ReviewForm from '../review-form/review-form';
import Review from '../review-item/review-item';
interface ReviewsListProps {
  reviews: ReviewI[];
  offerId: string;
}

export default function ReviewsList({ reviews, offerId }: ReviewsListProps) {
  const auth = useAppSelector((state) => state.user.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
      {auth !== AuthStatus.Unknown && <ReviewForm offerId={offerId}/>}
    </section>
  );
}
