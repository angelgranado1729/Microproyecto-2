import React, { useState, useEffect } from "react";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";
import image5 from "../../assets/image5.jpeg";
import { useMovies } from "../../hooks/useMovies";
import styles from "./HomePage.module.css";
import { Card } from "../../components/Card/Card";
import { Loading } from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function HomePage() {
    const [images, setImages] = useState([]);

    const {
        isLoading,
        nowPlayingMovies,
        getNowPlayingMovies,
        upComingMovies,
        getUpComingMovies,
        movieDetails,
        getMovieDetails
    } = useMovies();

    useEffect(() => {
        getNowPlayingMovies();
    }, [getNowPlayingMovies]);

    useEffect(() => {
        getUpComingMovies();
    }, [getUpComingMovies]);

    useEffect(() => {
        getMovieDetails(385687);
    }, [getMovieDetails]);


    useEffect(() => {
        // Fetch the list of images from the server (remember from firestore)
        setImages([image1, image2, image3, image4, image5]);
    }, []);

    const movieList = nowPlayingMovies.concat(upComingMovies);

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <div className={styles.carruselContainer}>
                    <ImageCarousel images={images} />
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