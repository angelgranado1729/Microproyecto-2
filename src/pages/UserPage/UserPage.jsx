import React, { useEffect, useState } from 'react';
import styles from './UserPage.module.css';
import { useUserContext } from "../../contexts/UserContext";
import { useMovies } from "../../hooks/useMovies";
import { PosterMovie } from '../../components/PosterMovie/PosterMovie';
import { ReserveInfo } from '../../components/ReserveInfo/ReserveInfo';
import { getActualUserById } from '../../utils/fireStoreHelpers';
import { Loading } from '../../components/Loading/Loading';

export function UserPage() {
  const { user } = useUserContext();
  const {
    getMoviesByIds,
    moviesByIds,
  } = useMovies();

  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        const actualUser = await getActualUserById(user.id);
        const moviesIds = actualUser.favoriteMovies;
        getMoviesByIds(moviesIds);
        setReservas(actualUser.reserves);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const renderFavoriteMovies = () => {
    if (moviesByIds.length === 0) {
      return <h2>No has agregado películas en tu lista de favoritos</h2>;
    }

    return (
      <div className={styles.favoriteMoviesContainer}>
        <h2>Películas favoritas</h2>
        <div className={styles.movieGrid}>
          {moviesByIds.map((movie) => (
            <PosterMovie movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  };

  const renderReserves = () => {
    if (!reservas || reservas.length === 0) {
      return <h2>No has reservado ninguna película</h2>;
    }

    return (
      <div className={styles.favoriteMoviesContainer}>
        <h2>Películas reservadas</h2>
        <div className={styles.movieGrid}>
          {reservas.map((reserve) => (
            <ReserveInfo key={reserve.id} reserve={reserve} />
          ))}
        </div>
      </div>
    );
  };


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      {renderFavoriteMovies()}
      {renderReserves()}
    </div>
  );
}
