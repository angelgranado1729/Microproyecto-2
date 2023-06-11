import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";

export function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the list of images from the server (remember from firestore)
    setImages([image1, image2, image3, image4, image5]);
  }, []);

  return (
    <>
      <ImageCarousel images={images} />
    </>
  );
}
