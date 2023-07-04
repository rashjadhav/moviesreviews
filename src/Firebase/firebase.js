// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtydwZkZmlDNbq78Y37VIR88bd5l4gjBs",
    authDomain: "moviesreviews-6ba04.firebaseapp.com",
    projectId: "moviesreviews-6ba04",
    storageBucket: "moviesreviews-6ba04.appspot.com",
    messagingSenderId: "391456154171",
    appId: "1:391456154171:web:dc0fd8af6b79178e41b21e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");  //this movies under collection bracket it is database name in firestore
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;