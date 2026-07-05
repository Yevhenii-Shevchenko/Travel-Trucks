import { FaStar } from "react-icons/fa";
import styles from "./RatingStars.module.css";

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export default function RatingStars({ rating, size = 14 }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <span className={styles.stars} role="img" aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((starIndex) => (
        <FaStar
          key={starIndex}
          size={size}
          className={
            starIndex <= Math.round(rating) ? styles.filled : styles.empty
          }
        />
      ))}
    </span>
  );
}
