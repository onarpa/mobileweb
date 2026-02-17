import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2t4djIsHPsSFOvPyEhsY4xU2wio6rHLI",
  authDomain: "lab06-expense-6d17d.firebaseapp.com",
  projectId: "lab06-expense-6d17d",
  storageBucket: "lab06-expense-6d17d.firebasestorage.app",
  messagingSenderId: "693742821346",
  appId: "1:693742821346:web:df1c4ec5f0f36ec55ae3bb",
  measurementId: "G-97RQBF5TR7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);