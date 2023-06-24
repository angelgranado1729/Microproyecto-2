import React, { useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import styles from "../Card/Card.module.css";
import { Loading } from "../Loading/Loading";

export function ReserveInfo({ reserve }) {
    const {
        movieDetails,
        getMovieDetails,
    } = useMovies();

    useEffect(() => {
        getMovieDetails(parseInt(reserve.movieId));
    }, []);

    const seats = reserve?.asientos.map((asiento) => asiento);
    const imageUrl = movieDetails ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : null;

    if (!movieDetails) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.front}>
                    <img src={imageUrl} alt={movieDetails.title} className={styles.image} />
                </div>
                <div className={styles.back}>
                    <div className={styles.infoContainer}>
                        <div className={styles.titleContainer}>
                            <h3 className={styles.title}>{movieDetails.title}</h3>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.infoTitle}>Cantidad de boletos comprados:</span>
                            <span>{reserve.asientos.length}</span>
                            <span className={styles.infoTitle}>Asientos:</span>
                            <span className={styles.subInfoItem}>
                                {seats && seats.join(", ")}
                            </span>
                            <span className={styles.infoTitle}>Total:</span>
                            <span>{reserve.total}</span>
                            <div className={styles.linkContainer}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
