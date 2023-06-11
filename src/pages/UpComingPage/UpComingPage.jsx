import React, { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import styles from "./UpComingPage.module.css";
import { Card } from "../../components/Card/Card";
import { Loading } from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function UpComingPage() {
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


    return (

        <div className={styles.container}>
            <div className={styles.titlePage}>
                <h1 className={styles.title}>Próximamente</h1>
            </div>
            <div className={styles.moviesContainer}>
                {isLoading ? (
                    <Loading />
                ) : (
                    upComingMovies.map((movie) => (
                        <Card movie={movie} key={movie.id} />
                    ))
                )}
            </div>
        </div>
    );
}
