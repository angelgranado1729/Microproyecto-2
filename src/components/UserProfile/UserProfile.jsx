import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { updateUser } from '../../firebase/users';
import { auth } from '../../firebase/firebase-config';
import { getUserReservations, getFavoriteMovies } from '../../utils/fireStoreHelpers';
import styles from './UserProfile.module.css';
import { Card } from '../Card/Card';

function UserProfile() {
  const { user } = useUserContext();
  const userId = auth.currentUser.uid;
  const [name] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [hasUpdatedAge, setHasUpdatedAge] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user.age > 0) {
      setHasUpdatedAge(true);
    }
  }, [user.age]);

  useEffect(() => {
    const fetchReservations = async () => {
      const userReservations = await getUserReservations(userId);
      if (userReservations) {
        setReservations(userReservations.reservations);
      }
    };

    const fetchFavoriteMovies = async () => {
      const userFavoriteMovies = await getFavoriteMovies(userId);
      if (userFavoriteMovies) {
        setFavoriteMovies(userFavoriteMovies);
      }
    };

    fetchReservations();
    fetchFavoriteMovies();
  }, [userId]);

  const handleUpdateProfile = async () => {
    if (!hasUpdatedAge && age > 0) {
      await updateUser(user.id, { age });
      setHasUpdatedAge(true);
    }
  };

  return (
    <div className={styles.userProfile}>
      <h1 className={styles.userPageTitle}>Perfil de usuario</h1>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre:
        </label>
        <span id="name" className={styles.nameDisplay}>
          {name}
        </span>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}>
          Edad:
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(Math.max(0, e.target.value))}
          className={styles.input}
          disabled={hasUpdatedAge}
        />
      </div>
      <button onClick={handleUpdateProfile} className={styles.updateButton}>
        Actualizar perfil
      </button>
      <h2>Películas favoritas</h2>
      <div className={styles.favoriteMoviesContainer}>
        {favoriteMovies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </div>
      <ul>
        {favoriteMovies.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
      <h2>Reservas</h2>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            Película: {reservation.movieTitle} - Asientos: {reservation.seats.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
