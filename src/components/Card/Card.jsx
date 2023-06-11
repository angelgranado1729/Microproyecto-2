import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function Card({ movie }) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.front}>
                    <img src={imageUrl} alt={movie.title} className={styles.image} />
                </div>
                <div className={styles.back}>
                    <div className={styles.infoContainer}>
                        <h3 className={styles.title}>
                            {movie.title}
                            <Link to={`${MOVIE_DETAIL_URL}/${movie.id}`} className={styles.link}>
                                <span className={styles.linkText}>Ver más</span>
                            </Link>
                        </h3>
                        <div className={styles.info}>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    <span className={styles.infoTitle}>Idioma: {movie.original_language}</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <span className={styles.infoTitle}>Géneros: {movie.genre_ids}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
