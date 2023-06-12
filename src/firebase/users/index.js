import {
    doc,
    addDoc,
    collection,
    updateDoc,
    getDoc,
    setDoc,
    getDocs,
    query,
    where,
    deleteDoc
  } from "firebase/firestore";
  import { db } from "../firebase-config";
  export const USERS_COLLECTION = "users";
  
  export async function createUser(data) {
    const { uid, ...restData } = data;
  
    if (uid) {
      return setDoc(doc(db, USERS_COLLECTION, uid), restData);
    }
  
    return addDoc(collection(db, USERS_COLLECTION), restData);
  }
  
  export async function updateUser(userId, data) {
    const userRef = doc(db, USERS_COLLECTION, userId);
    return updateDoc(userRef, data);
  }
  
  export async function getUserById(userId) {
    const userRef = doc(db, USERS_COLLECTION, userId);
    return getDoc(userRef);
  }
  
  export async function getUserProfile(email) {
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where("email", "==", email)
    );
  
    const results = await getDocs(userQuery);
  
    if (results.size > 0) {
      const [user] = results.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      return user;
    }
  
    return null;
  }


  
  export async function addFavoriteMovie(userId, movie) {
    try {
      const favMovieCollectionRef = collection(db, 'favMovie');
      await addDoc(favMovieCollectionRef, {
        ...movie,
        userId,
      });
    } catch (error) {
      console.error('Error al agregar película favorita:', error);
      throw new Error('Error al agregar película favorita');
    }
  }
  
  export async function removeFavoriteMovie(movieId) {
    try {
      const movieDocRef = doc(db, 'favMovie', movieId);
      await deleteDoc(movieDocRef);
    } catch (error) {
      console.error('Error al eliminar película favorita:', error);
      throw new Error('Error al eliminar película favorita');
    }
  }