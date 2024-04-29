// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-f1181.firebaseapp.com",
  projectId: "auth-f1181",
  storageBucket: "auth-f1181.appspot.com",
  messagingSenderId: "987677481458",
  appId: "1:987677481458:web:d48893f04537af68bfb36b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);