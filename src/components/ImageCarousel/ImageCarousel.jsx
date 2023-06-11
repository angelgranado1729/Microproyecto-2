
import { useState, useEffect } from "react";
import "./ImageCarousel.css";

export function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageCarouselTick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleImageCarouselTick, 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={index === currentImageIndex ? "active" : ""}
        />
      ))}
    </div>
  );
}