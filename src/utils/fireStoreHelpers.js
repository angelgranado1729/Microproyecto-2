import {
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

export async function addFavoriteMovie(userId, movieId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favoriteMovies: arrayUnion(movieId),
    });
    console.log("Película agregada a la lista de favoritos del usuario");
  } catch (error) {
    console.error(
      "Error al agregar la película a la lista de favoritos:",
      error
    );
    throw new Error("Error al agregar la película a la lista de favoritos");
  }
}

export async function removeFavoriteMovie(userId, movieId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favoriteMovies: arrayRemove(movieId),
    });
    console.log("Película eliminada de la lista de favoritos del usuario");
  } catch (error) {
    console.error(
      "Error al eliminar la película de la lista de favoritos:",
      error
    );
    throw new Error("Error al eliminar la película de la lista de favoritos");
  }
}

export async function getFavoriteMovieById(user_id, movie_id) {
  try {
    const userRef = doc(db, "users", user_id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      const favoriteMovies = user.favoriteMovies;
      if (favoriteMovies.includes(movie_id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la película favorita por ID:", error);
    throw new Error("Error al obtener la película favorita por ID");
  }
}

export async function reserve(userId, movieId, asientos, total) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      reserves: arrayUnion({
        movieId: movieId,
        asientos: asientos,
        total: total,
      }),
    });
    console.log("Reserva agregada al usuario");
  } catch (error) {
    console.error("Error al agregar la reserva al usuario:", error);
    throw new Error("Error al agregar la reserva al usuario");
  }
}

export async function getActualUserById(user_id) {
  try {
    const userRef = doc(db, "users", user_id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw new Error("Error al obtener el usuario por ID");
  }
}
