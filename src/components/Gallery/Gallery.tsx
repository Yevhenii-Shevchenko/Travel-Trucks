"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./Gallery.module.css";

interface GalleryProps {
  images: string[];
  alt: string;
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/placeholder-camper.svg";
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const slides =
    images && images.length > 0 ? images : ["/placeholder-camper.svg"];

  const canLoop = slides.length >= 3;

  return (
    <div className={styles.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        loop={canLoop}
        className={styles.mainSwiper}
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              onError={handleImgError}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {slides.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          slidesPerView="auto"
          spaceBetween={32}
          watchSlidesProgress
          className={styles.thumbsSwiper}
        >
          {slides.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`${alt} — thumbnail ${i + 1}`}
                onError={handleImgError}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
