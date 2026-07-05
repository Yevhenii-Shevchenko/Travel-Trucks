import RatingStars from "@/components/RatingStars/RatingStars";
import { CamperReview } from "@/lib/types";
import styles from "./Reviews.module.css";

interface ReviewsProps {
  reviews: CamperReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet for this camper.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, i) => {
        const name =
          review.name ??
          review.reviewer_name ??
          review.author ??
          review.reviewerName ??
          "Anonymous";
        const rating =
          review.rating ?? review.reviewer_rating ?? review.score ?? 0;
        const comment = review.comment ?? review.text ?? review.message ?? "";
        return (
          <li key={i} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.avatar}>
                {name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className={styles.name}>{name}</p>
                <RatingStars rating={rating} size={13} />
              </div>
            </div>
            <p className={styles.comment}>{comment}</p>
          </li>
        );
      })}
    </ul>
  );
}
