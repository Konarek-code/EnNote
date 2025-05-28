import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEJMxmhzWObrqXm_spCP3wki_HfqNiV1I",
  authDomain: "ennote-abf16.firebaseapp.com",
  projectId: "ennote-abf16",
  storageBucket: "ennote-abf16.firebasestorage.app",
  messagingSenderId: "305143166666",
  appId: "1:305143166666:web:f24ec9d3d8e5b27c1fe633",
  measurementId: "G-MXGVD7NKQY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
