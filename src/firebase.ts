import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (from your project)
const firebaseConfig = {
  apiKey: "AIzaSyAxrCrNfeqemOXnHBiqsNtRl1ajazqZnvo",
  authDomain: "books-83578.firebaseapp.com",
  projectId: "books-83578",
  storageBucket: "books-83578.appspot.com",
  messagingSenderId: "684029119712",
  appId: "1:684029119712:web:726a3541cf150846fad485",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore to use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);