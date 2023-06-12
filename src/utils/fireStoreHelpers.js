import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export async function getFunciones() {
  try {
    const querySnapshot = await getDocs(collection(db, "funciones"));
    const funciones = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return funciones;
  } catch (error) {
    console.error("Error al obtener las funciones:", error);
    throw new Error("Error al obtener las funciones");
  }
}

export async function createFuncion(movieId, title, bool) {
  try {
    const docRef = doc(db, "funciones", movieId);
    const data = {
      movieId: movieId,
      title: title,
      boletos_vendidos: [],
    };

    await setDoc(docRef, data, { merge: bool });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la función:", error);
    throw new Error("Error al crear la función");
  }
}

export async function getFuncionById(movieId) {
  try {
    const docRef = doc(db, "funciones", movieId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la función por ID:", error);
    throw new Error("Error al obtener la función por ID");
  }
}

export async function upDateBoletosVendidos(movieId, boletosVendidos) {
  try {
    const docRef = doc(db, "funciones", movieId);
    boletosVendidos.forEach(async (asiento) => {
      await updateDoc(docRef, {
        boletos_vendidos: arrayUnion(asiento),
      });
    });
    console.log("PASO LA VAINAAAA NOJODAAAA");
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar los boletos vendidos");
  }
}

export async function handleFunciones(movie_Id, title_movie) {
  try {
    const funcion = await getFuncionById(movie_Id);
    if (funcion) {
      return funcion;
    } else {
      const id = await createFuncion(movie_Id, title_movie, false);
      return id;
    }
  } catch (error) {
    console.error("Error al obtener la función:", error);
    throw new Error("Error al obtener la función");
  }
}
export async function getUserReservations(userId) {
  try {
    const docRef = doc(db, 'reservations', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener las reservas del usuario:', error);
    throw new Error('Error al obtener las reservas del usuario');
  }
}
export async function getFavoriteMovies(userId) {
  try {
    const favMovieQuery = query(
      collection(db, 'favMovie'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(favMovieQuery);
    const favoriteMovies = [];
    querySnapshot.forEach((doc) => {
      favoriteMovies.push(doc.data());
    });
    return favoriteMovies;
  } catch (error) {
    console.error('Error al obtener películas favoritas:', error);
    throw new Error('Error al obtener películas favoritas');
  }
}

export const addMovieToFavorites = async (userId, movie) => {
  const userRef = firestore.collection("users").doc(userId);
  await userRef.update({
    favoriteMovies: firebase.firestore.FieldValue.arrayUnion(movie),
  });
};

export const removeMovieFromFavorites = async (userId, movieId) => {
  const userRef = firestore.collection("users").doc(userId);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.data();
  const updatedFavoriteMovies = userData.favoriteMovies.filter(
    (movie) => movie.id !== movieId
  );

  await userRef.update({
    favoriteMovies: updatedFavoriteMovies,
  });
};

