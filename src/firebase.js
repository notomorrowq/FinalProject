// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADoytsTxAzU4IOPAK7volFYCIViRpVcEo",
  authDomain: "noqf-27031.firebaseapp.com",
  projectId: "noqf-27031",
  storageBucket: "noqf-27031.firebasestorage.app",
  messagingSenderId: "1041858338596",
  appId: "1:1041858338596:web:69875dd98a38ca0bfc9db1",
  measurementId: "G-51SKWP6QHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);