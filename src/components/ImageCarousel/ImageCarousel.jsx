import { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

export function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => {
      clearInterval(intervalId);
    };
  }, [images.length]);

  return (
    <div className={styles.imageCarousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentImageIndex * 32}%)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}
