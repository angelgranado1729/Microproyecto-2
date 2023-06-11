import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import styles from "./MovieDetailPage.module.css";

export function MovieDetailPage() {
    // const IMAGE_URL_BASE = "https://www.themoviedb.org/t/p/w220_and_h330_face";
    // const { movieId } = useParams();
    // const {
    //     isLoading,
    //     upComingMovies,
    //     nowPlayingMovies,
    //     movieDetails,
    //     getUpComingMovies,
    //     getNowPlayingMovies,
    //     getMovieDetails
    // } = useMovies() || {};

    // const {
    //     id,
    //     original_language,
    //     overview,
    //     poster_path,
    //     release_date,
    //     runtime,
    //     status,
    //     title
    // } = movieDetails || {};


    // useEffect(() => {
    //     if (!isLoading && movieId) {
    //         getMovieDetails(movieId);
    //     }
    // }, []);

    // if (isLoading) {
    //     return (
    //         <div className={styles.container}>
    //             <h1 className={styles.loadingTxt}>Loading...</h1>
    //         </div>
    //     );
    // }

    // if (!isLoading && !character) {
    //     return (
    //         <div className={styles.container}>
    //             <h1 className={styles.loadingTxt}>NOT FOUND DATA</h1>
    //         </div>
    //     );
    // }

    // return (
    //     <div className={styles.container}>
    //         <div className={styles.imageContainer}>
    //             <img src={`${IMAGE_URL_BASE}${poster_path}`} className={styles.poster} />
    //         </div>
    //         <div className={styles.details}>
    //             <h1 className={styles.title}>{title}</h1>
    //             <p className={styles.overview}>{overview}</p>
    //             <div className={styles.infoContainer}>
    //                 <div className={styles.info}>
    //                     <h3 className={styles.infoTitle}>Original Language</h3>
    //                     <p className={styles.infoValue}>{original_language}</p>

    //                     <h3 className={styles.infoTitle}>Release Date</h3>
    //                     <p className={styles.infoValue}>{release_date}</p>

    //                     <h3 className={styles.infoTitle}>Runtime</h3>
    //                     <p className={styles.infoValue}>{runtime}</p>

    //                     <h3 className={styles.infoTitle}>Status</h3>
    //                     <p className={styles.infoValue}>{status}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}