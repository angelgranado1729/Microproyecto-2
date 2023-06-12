// src/components/FavoriteMovies/FavoriteMovies.jsx
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function FavoriteMovies() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection('favMovie').doc('2twmQ5tFb6Az6EdwjklA').collection('ID');

    docRef.get().then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFavoriteMovies(data);
    });
  }, []);

  return (
    <div>
      <h2>Favorite Movies</h2>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteMovies;