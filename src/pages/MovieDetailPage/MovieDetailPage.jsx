import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import styles from "./MovieDetailPage.module.css";
import { Loading } from "../../components/Loading/Loading";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL, RESERVE_URL } from "../../constants/urls";

export function MovieDetailPage() {
    const IMAGE_URL_BASE = "https://www.themoviedb.org/t/p/w220_and_h330_face";
    const { movie_id } = useParams();
    const {
        isLoading,
        getMovieDetails,
        movieDetails,
        movieCredits,
        getMovieCredits,
    } = useMovies();

    const { user } = useUserContext();

    const {
        spoken_languages,
        genres,
        title,
        overview,
        poster_path,
        release_date,
        runtime,
        status,
    } = movieDetails || {};

    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        if (!isLoading && movie_id) {
            getMovieDetails(movie_id);
            getMovieCredits(movie_id);
        }
    }, []);

    const actors = movieCredits?.cast;
    const director =
        movieCredits?.crew &&
        movieCredits.crew.find(
            (crew) => crew.department === "Directing" && crew.job === "Director"
        );

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    }

    if (!movieDetails && !isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Upss... ha ocurrido un error. Intentelo más tarde!
                </h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.titlePage}>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <div className={styles.movieContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={`${IMAGE_URL_BASE}${poster_path}`}
                        alt={title}
                        className={styles.image}
                    />
                    {!user ? (
                        <Link to={LOGIN_URL} className={styles.link}>
                            <button className={styles.favoriteButton}>
                                Login to add to Favorites
                            </button>
                        </Link>
                    ) : (
                        <button
                            className={styles.favoriteButton}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    )}
                    {user ? (
                        <Link to={RESERVE_URL} className={styles.link}>
                            <button className={styles.reserveButton}>Reserve</button>
                        </Link>
                    ) : (
                        <Link to={LOGIN_URL} className={styles.link}>
                            <button className={styles.reserveButton}>
                                Login to Reserve
                            </button>
                        </Link>
                    )}
                </div>

                <div className={styles.detailsContainer}>
                    <h2 className={styles.subtitle}>Sinópsis</h2>
                    <p className={styles.overview}>{overview}</p>
                    <div className={styles.info}>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Fecha de estreno:</span>{" "}
                            {release_date}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Duración:</span> {runtime} minutes
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Estatus:</span> {status}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Idiomas:</span>{" "}
                            {spoken_languages &&
                                spoken_languages.map((language) => language.name).join(", ")}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Géneros:</span>{" "}
                            {genres && genres.map((genre) => genre.name).join(", ")}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Actores:</span>{" "}
                            {actors && actors.map((actor) => actor.name).join(", ")}
                        </p>
                        {director && (
                            <p className={styles.infoItem}>
                                <span className={styles.infoTitle}>Director:</span> {director.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
