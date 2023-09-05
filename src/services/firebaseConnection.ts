// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi440BBP4pWD3o55Kz4fZo34uFQla4vj8",
  authDomain: "webcarros-bb70c.firebaseapp.com",
  projectId: "webcarros-bb70c",
  storageBucket: "webcarros-bb70c.appspot.com",
  messagingSenderId: "768118723485",
  appId: "1:768118723485:web:c465dd464401cce3555574",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
