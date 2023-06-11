import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function Card({ movie }) {
    return (
        <div className={styles.container} onClick={MOVIE_DETAIL_URL(movie.id)}>
            <div>
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className={styles.image}
                />
            </div>
            <div className={styles.rightSideContainer}>
                <div className={styles.infoContainer}>
                    <h2 className={styles.title}>
                        <Link
                            to={MOVIE_DETAIL_URL(movie.id)}
                            className={styles.link}
                        >
                            {movie.title}
                        </Link>
                    </h2>
                    <div className={styles.genreRow}>
                        <h3 className={styles.genre}>{movie.genre}</h3>
                        <h3 className={styles.language}>{movie.language}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

