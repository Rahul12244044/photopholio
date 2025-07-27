// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHAZjm_lmfm6OYuBKeef0girowu4EjBVc",
  authDomain: "photofolio-e7ff6.firebaseapp.com",
  projectId: "photofolio-e7ff6",
  storageBucket: "photofolio-e7ff6.firebasestorage.app",
  messagingSenderId: "1836552008",
  appId: "1:1836552008:web:315df6f323d537f1976d7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initilize firebase and get reference of that service
const db=getFirestore(app);
export default db;