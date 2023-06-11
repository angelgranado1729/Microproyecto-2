import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { Card } from "../../components/Card/Card";
import { useMovies } from "../../hooks/useMovies";
import SearchBar from "../../components/SearchBar/SearchBar";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";
import image6 from "../../assets/image6.jpeg";
import image7 from "../../assets/image7.jpeg";
import image8 from "../../assets/image8.jpeg";

export function HomePage() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { nowPlayingMovies, getNowPlayingMovies } = useMovies();

  useEffect(() => {
    setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredMovies = nowPlayingMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ImageCarousel images={images} />
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} style={{ margin: "0.5rem" }}>
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
}
