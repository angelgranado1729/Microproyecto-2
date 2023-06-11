import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { Card } from "../../components/Card/Card"; // Importa el componente Card
import { useMovies } from "../../hooks/useMovies"; // Importa el hook useMovies
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";

export function HomePage() {
  const [images, setImages] = useState([]);
  const {
    nowPlayingMovies,
    getNowPlayingMovies,
  } = useMovies(); // Utiliza el hook useMovies

  useEffect(() => {
    // Fetch the list of images from the server (remember from firestore)
    setImages([image1, image2, image3, image4, image5]);
    getNowPlayingMovies(); // Obtiene las películas en cartelera
  }, [getNowPlayingMovies]);

  return (
    <>
      <ImageCarousel images={images} />
      <div>
        {nowPlayingMovies.map((movie) => (
          <Card key={movie.id} movie={movie} /> // Renderiza el componente Card para cada película
        ))}
      </div>
    </>
  );
}
