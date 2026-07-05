"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt } from "react-icons/fa";
import RatingStars from "@/components/RatingStars/RatingStars";
import VehicleDetails from "@/components/VehicleDetails/VehicleDetails";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";
import { fetchCamperReviews } from "@/lib/api";
import {
  Camper,
  CamperReview,
  extractImageUrl,
  extractReviews,
  formatLocation,
  formatPrice,
  formatRating,
} from "@/lib/types";
import styles from "./details.module.css";

const Gallery = dynamic(() => import("@/components/Gallery/Gallery"), {
  ssr: false,
  loading: () => <Loader overlay />,
});

export default function CamperDetailsClient({ camper }: { camper: Camper }) {
  const normalizedGallery =
    camper.gallery?.map(extractImageUrl).filter(Boolean) ?? [];
  const galleryImages =
    normalizedGallery.length > 0
      ? normalizedGallery
      : camper.coverImage
      ? [camper.coverImage]
      : [];

  const [reviews, setReviews] = useState<CamperReview[]>(() =>
    extractReviews(camper)
  );

  useEffect(() => {
    let cancelled = false;
    if (extractReviews(camper).length > 0) return;

    fetchCamperReviews(camper.id).then((fetched) => {
      if (!cancelled && fetched.length > 0) setReviews(fetched);
    });

    return () => {
      cancelled = true;
    };
  }, [camper]);

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Gallery images={galleryImages} alt={camper.name ?? "Camper"} />

          <h2 className={styles.reviewsHeading}>Reviews</h2>
          <Reviews reviews={reviews} />
        </div>

        <div className={styles.right}>
          <div className={styles.infoCard}>
            <h1 className={styles.name}>{camper.name ?? "Camper"}</h1>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <RatingStars rating={Number(camper.rating) || 0} />
                {formatRating(camper.rating)}({camper.totalReviews ?? 0}{" "}
                Reviews)
              </span>
              <span className={styles.metaItem}>
                <FaMapMarkerAlt />
                {formatLocation(camper.location)}
              </span>
            </div>
            <p className={styles.price}>€{formatPrice(camper.price)}</p>
            <p className={styles.description}>
              {camper.description ?? ""}
            </p>
          </div>

          <VehicleDetails camper={camper} />

          <BookingForm camperId={camper.id} camperName={camper.name ?? "this camper"} />
        </div>
      </div>
    </div>
  );
}
