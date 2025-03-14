// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEJMxmhzWObrqXm_spCP3wki_HfqNiV1I",
  authDomain: "ennote-abf16.firebaseapp.com",
  projectId: "ennote-abf16",
  storageBucket: "ennote-abf16.firebasestorage.app",
  messagingSenderId: "305143166666",
  appId: "1:305143166666:web:f24ec9d3d8e5b27c1fe633",
  measurementId: "G-MXGVD7NKQY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
