import { ReviewI } from "../../types/review";
import ReviewForm from "../review-form/review-form";
import Review from "../review/review";
interface ReviewsListProps {
    reviews: ReviewI[]
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
    return (
        <section className="offer__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ul className="reviews__list">
                {reviews.map((review) => (
                    <Review key={review.id} review={review}/>
                ))}
            </ul>
            <ReviewForm />
        </section>
    )
}