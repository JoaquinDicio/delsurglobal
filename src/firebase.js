import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbhHAT_klGzwWP4deuyPNtCAy019pszUU",
  authDomain: "auth-se-f2101.firebaseapp.com",
  projectId: "auth-se-f2101",
  storageBucket: "auth-se-f2101.firebasestorage.app",
  messagingSenderId: "69128162367",
  appId: "1:69128162367:web:76b94ccc4e31cb5df9bc8a",
  measurementId: "G-5FXL8TK5JE",
};

const app = initializeApp(firebaseConfig);
export default app;
