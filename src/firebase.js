// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "boffo-project.firebaseapp.com",
  projectId: "boffo-project",
  storageBucket: "boffo-project.appspot.com",
  messagingSenderId: "245693375709",
  appId: "1:245693375709:web:a34db6a05dfcdc2f732734"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);