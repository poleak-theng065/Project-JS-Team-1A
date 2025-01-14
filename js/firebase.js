// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtPeGHzpzLYTM86OCCk2Pc6LSndy3U0AM",
  authDomain: "projectjs-quizapp.firebaseapp.com",
  databaseURL: "https://projectjs-quizapp-default-rtdb.firebaseio.com",
  projectId: "projectjs-quizapp",
  storageBucket: "projectjs-quizapp.firebasestorage.app",
  messagingSenderId: "859375194032",
  appId: "1:859375194032:web:bfc70aa6261b67ba351075",
  measurementId: "G-T4QZKLYM6Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Correctly initialize the Firestore database

// Export the `db` object so it can be used in other files
export { db };
