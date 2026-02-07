// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2t4djIsHPsSFOvPyEhsY4xU2wio6rHLI",
  authDomain: "lab06-expense-6d17d.firebaseapp.com",
  projectId: "lab06-expense-6d17d",
  storageBucket: "lab06-expense-6d17d.firebasestorage.app",
  messagingSenderId: "693742821346",
  appId: "1:693742821346:web:344bb53c4e3df7f75ae3bb",
  measurementId: "G-VMXQTS4736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// สร้าง instance และ Export (ต้องประกาศหลังสร้าง app)
export const db = getFirestore(app); 
export const analytics = getAnalytics(app);