// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4DbxTAGRO7ccs4DuEg1pkRoGpsaJxqnQ",
  authDomain: "rahi-98f41.firebaseapp.com",
  projectId: "rahi-98f41",
  storageBucket: "rahi-98f41.appspot.com",
  messagingSenderId: "869373384582",
  appId: "1:869373384582:web:8f38bd49b8fc0dd1513e07",
  measurementId: "G-WEGCDQNZBQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
