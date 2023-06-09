//Configuración para la conexión con Firebase y Firestore

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//Import para Storage:
import { getStorage } from "firebase/storage";
//Import para Firestore:
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APP_APIKEY}`,
  authDomain: `${import.meta.env.VITE_APP_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_APP_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_APP_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_APP_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_APP_APPID}`
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//Para Firestore:
export const db = getFirestore(app);
//Para Storage:
export const storage = getStorage(app);