import React from "react";
import { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import { Card } from "../../components/Card/Card";
import { useMovies } from "../../hooks/useMovies";
import SearchBar from "../../components/SearchBar/SearchBar";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";
import styles from "./HomePage.module.css";
import { Loading } from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function HomePage() {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { nowPlayingMovies, getNowPlayingMovies } = useMovies();

    useEffect(() => {
        // Fetch the list of images from the server (remember from firestore)
        setImages([image1, image2, image3, image4, image5]);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredMovies = nowPlayingMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const movieList = nowPlayingMovies.concat(upComingMovies);

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <div className={styles.carruselContainer}>
                    <ImageCarousel images={images} />
                    <SearchBar onSearch={handleSearch} />
                    <div>
                        {filteredMovies.map((movie) => (
                            <Card key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
                <div className={styles.moviesContainer}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        movieList.map((movie) => (
                            <Card movie={movie} key={movie.id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
