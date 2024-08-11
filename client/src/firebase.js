// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-929c0.firebaseapp.com",
  projectId: "mern-estate-929c0",
  storageBucket: "mern-estate-929c0.appspot.com",
  messagingSenderId: "516444028207",
  appId: "1:516444028207:web:c9e427b593b819d9b035da",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
