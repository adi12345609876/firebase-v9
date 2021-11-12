// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAEvObqMNNVaOdCMSX8Js3bZB40wvBMhY",
    authDomain: "v9-color.firebaseapp.com",
    projectId: "v9-color",
    storageBucket: "v9-color.appspot.com",
    messagingSenderId: "716310040658",
    appId: "1:716310040658:web:9ae0d29f62557220f3cf8b",
    measurementId: "G-6RNNKP4DX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();