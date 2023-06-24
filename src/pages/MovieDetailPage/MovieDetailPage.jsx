import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import styles from "./MovieDetailPage.module.css";
import { Loading } from "../../components/Loading/Loading";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL, RESERVE_URL } from "../../constants/urls";
import {
    getFuncionById,
    addFavoriteMovie,
    removeFavoriteMovie,
    getFavoriteMovieById
} from "../../utils/fireStoreHelpers";

export function MovieDetailPage() {
    const { user } = useUserContext();
    const IMAGE_URL_BASE = "https://www.themoviedb.org/t/p/w220_and_h330_face";
    const { movie_id } = useParams();
    const [isLoadingFS, setIsLoadingFS] = useState(false);
    const {
        isLoading,
        getMovieDetails,
        movieDetails,
        movieCredits,
        getMovieCredits,
        upComingMovies,
        getUpComingMovies,
        getNowPlayingMovies,
        nowPlayingMovies,
    } = useMovies();

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
    const [isSeatsCountLoading, setIsSeatsCountLoading] = useState(false);

    const handleFavoriteClick = async () => {
        if (user) {
            setIsFavorite(!isFavorite);

            try {
                if (!isFavorite) {
                    await addFavoriteMovie(user.id, movie_id, title);
                } else {
                    await removeFavoriteMovie(user.id, movie_id);
                }
            } catch (error) {
                console.error("Error al agregar/quitar la película de favoritos:", error);
            }
        }
    };

    useEffect(() => {
        if (!isLoading && movie_id) {
            getMovieDetails(movie_id);
            getUpComingMovies();
            getMovieCredits(movie_id);
            getNowPlayingMovies();
            if (user) {
                const fetchFavoriteMovie = async () => {
                    setIsLoadingFS(true);
                    try {
                        const favMovie = await getFavoriteMovieById(user.id, movie_id);
                        setIsFavorite(!!favMovie);
                    } catch (error) {
                        console.error("Error al obtener la película favorita:", error);
                    }
                    setIsLoadingFS(false);
                };
                fetchFavoriteMovie();
            }
        }
    }, [isLoading, movie_id, user]);

    const isUpComingMovie = upComingMovies.some(
        (movie) => movie.id === parseInt(movie_id)
    );

    const seatsCountRef = useRef(null);

    const numberOfSeats = async () => {
        if (!isUpComingMovie) {
            const funcion = await getFuncionById(String(movie_id));
            const asientos = funcion?.boletos_vendidos; // Agrega una validación para funcion
            if (asientos) {
                console.log(asientos.length);
                return asientos.length;
            }
        }
        return -1;
    };


    useEffect(() => {
        if (!isUpComingMovie) {
            const getNumberOfSeats = async () => {
                setIsSeatsCountLoading(true);
                const num = await numberOfSeats();
                seatsCountRef.current = num;
                setIsSeatsCountLoading(false);
            };
            getNumberOfSeats();
        }
    }, []);

    const getReservationButton = () => {
        if (isUpComingMovie) {
            return <div className={styles.upcomingButton}>Próximamente</div>;
        } else {
            if (nowPlayingMovies.some((movie) => movie.id === parseInt(movie_id))) {
                if (isSeatsCountLoading) {
                    return <Loading />;
                } else if (seatsCountRef.current >= 20) {
                    return <div className={styles.reserveButonAgotado}>Agotado</div>;
                } else {
                    if (user) {
                        return (
                            <Link to={RESERVE_URL.replace(":movie_id", movie_id)} className={styles.link}>
                                <button className={styles.reserveButton}>Reserve</button>
                            </Link>
                        );
                    } else {
                        return (
                            <Link to={LOGIN_URL} className={styles.link}>
                                <button className={styles.reserveButton}>Login to Reserve</button>
                            </Link>
                        );
                    }
                }
            }
        }
    };

    const getFavButton = () => {
        if (user) {
            return (
                <button
                    className={styles.favoriteButton}
                    onClick={handleFavoriteClick}
                    disabled={isLoadingFS}
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            );
        } else {
            return (
                <Link to={LOGIN_URL} className={styles.link}>
                    <button className={styles.favoriteButton}>Login to add to Favorites</button>
                </Link>
            );
        }
    };

    const actors = movieCredits?.cast;
    const director =
        movieCredits?.crew &&
        movieCredits.crew.find(
            (crew) => crew.department === "Directing" && crew.job === "Director"
        );

    if (isLoading || isSeatsCountLoading) {
        return (
            <div className={styles.container}>
                <Loading />
            </div>
        );
    }

    if (!movieDetails && !isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Upss... ha ocurrido un error. Intentelo más tarde!</h1>
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
                    {getFavButton()}
                    {getReservationButton()}
                </div>

                <div className={styles.detailsContainer}>
                    <h2 className={styles.subtitle}>Sinópsis</h2>
                    <p className={styles.overview}>{overview}</p>
                    <div className={styles.info}>
                        <p className={styles.infoItem}>
                            <span className={styles.infoTitle}>Fecha de estreno:</span> {release_date}
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
