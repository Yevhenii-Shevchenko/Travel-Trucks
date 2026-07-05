import { FaMapMarkerAlt, FaGasPump, FaCogs, FaCarSide } from "react-icons/fa";
import RatingStars from "@/components/RatingStars/RatingStars";
import {
  Camper,
  capitalize,
  formLabel,
  formatLocation,
  formatPrice,
  formatRating,
} from "@/lib/types";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const thumbnail = camper.coverImage || "/placeholder-camper.svg";

  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <img
          src={thumbnail}
          alt={camper.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-camper.svg";
          }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.name}>{camper.name}</h3>
          <span className={styles.price}>€{formatPrice(camper.price)}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <RatingStars rating={Number(camper.rating) || 0} />
            <span>
              {formatRating(camper.rating)}({camper.totalReviews ?? 0} Reviews)
            </span>
          </span>
          <span className={styles.metaItem}>
            <FaMapMarkerAlt />
            {formatLocation(camper.location)}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.badges}>
          <li className={styles.badge}>
            <FaGasPump />
            {capitalize(camper.engine)}
          </li>
          <li className={styles.badge}>
            <FaCogs />
            {capitalize(camper.transmission)}
          </li>
          <li className={styles.badge}>
            <FaCarSide />
            {formLabel(camper.form)}
          </li>
        </ul>

        <a
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-accent ${styles.showMore}`}
        >
          Show more
        </a>
      </div>
    </li>
  );
}
