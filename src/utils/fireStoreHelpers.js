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
