// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBrItnJK3G8Qu4sJrQTebiqLRZBf33izko",
  authDomain: "project-managment-bd3c2.firebaseapp.com",
  projectId: "project-managment-bd3c2",
  storageBucket: "project-managment-bd3c2.firebasestorage.app",
  messagingSenderId: "170711398031",
  appId: "1:170711398031:web:e0cd16b895d841b6cf62fa",
  measurementId: "G-899SMBDQT1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);