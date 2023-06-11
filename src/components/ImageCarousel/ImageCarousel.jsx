import { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

export function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageCarouselTick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleImageCarouselTick, 2500);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <div className={styles.imageCarousel}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={index === currentImageIndex ? styles.active : ""}
        />
      ))}
    </div>
  );
}