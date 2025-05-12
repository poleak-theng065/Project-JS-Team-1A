// Import the necessary Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5PHjekEhLKwr8-DvwZoQNaKhrwnHlTs",
  authDomain: "quizapp-e2cc2.firebaseapp.com",
  databaseURL: "https://quizapp-e2cc2-default-rtdb.firebaseio.com",
  projectId: "quizapp-e2cc2",
  storageBucket: "quizapp-e2cc2.firebasestorage.app",
  messagingSenderId: "734105146347",
  appId: "1:734105146347:web:e25b3fde43fda4bba63fae",
  measurementId: "G-S043X4L367"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); // For Realtime Database

export { db };