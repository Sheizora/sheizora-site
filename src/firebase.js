// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzVaW7p3OBnCXPlI_UQWwwQaUTFKQpn78",
  authDomain: "sheizora-jewellery.firebaseapp.com",
  projectId: "sheizora-jewellery",
  storageBucket: "sheizora-jewellery.appspot.com",
  messagingSenderId: "586369878708",
  appId: "1:586369878708:web:d231e72c89e6abc900a5e1",
  measurementId: "G-XQCS1DYMZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics };
