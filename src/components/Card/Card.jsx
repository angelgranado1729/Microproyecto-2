import React, { useEffect } from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";
import { useMovies } from "../../hooks/useMovies";

export function Card({ movie }) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const {
        isLoading,
        getMovieDetails,
        movieDetails,
    } = useMovies();

    useEffect(() => {
        getMovieDetails(movie.id);
    }, [getMovieDetails, movie.id]);

    const spokenLanguages = movieDetails?.spoken_languages.map(
        (language) => language.name
    );
    const genres = movieDetails?.genres.map((genre) => genre.name);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.front}>
                    <img src={imageUrl} alt={movie.title} className={styles.image} />
                </div>
                <div className={styles.back}>
                    <div className={styles.infoContainer}>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.title}>{movie.title}</h3>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.infoTitle}>Idiomas:</span>
                            <span className={styles.subInfoItem}>
                                {spokenLanguages && spokenLanguages.join(", ")}
                            </span>
                            <span className={styles.infoTitle}>Géneros:</span>
                            <span className={styles.subInfoItem}>
                                {genres && genres.join(", ")}
                            </span>
                            <div className={styles.linkContainer}>
                                <h3 className={styles.title}>
                                    <Link to={`${MOVIE_DETAIL_URL}/${movie.id}`} className={styles.link}>
                                        <span className={styles.linkText}>Ver más</span>
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
