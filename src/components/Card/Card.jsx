import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { MOVIE_DETAIL_URL } from "../../constants/urls";

export function Card({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Agrega la URL base de la imagen

  return (
    <div className={styles.container} onClick={MOVIE_DETAIL_URL(movie.id)}>
      <div>
        <img
          src={imageUrl} // Utiliza la URL completa de la imagen
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

