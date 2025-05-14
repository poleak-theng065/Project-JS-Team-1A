// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  set, 
  update, 
  push, 
  get, 
  child 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  setPersistence, // Add this for persistence
  indexedDBLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5PHjekEhLKwr8-DvwZoQNaKhrwnHlTs",
  authDomain: "quizapp-e2cc2.firebaseapp.com",
  databaseURL: "https://quizapp-e2cc2-default-rtdb.firebaseio.com",
  projectId: "quizapp-e2cc2",
  storageBucket: "quizapp-e2cc2.appspot.com",
  messagingSenderId: "734105146347",
  appId: "1:734105146347:web:e25b3fde43fda4bba63fae",
  measurementId: "G-S043X4L367"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Set persistence (optional, if you need indexedDBLocalPersistence)
setPersistence(auth, indexedDBLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to indexedDBLocalPersistence");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Initialize Realtime Database
const db = getDatabase(app);

export { db, auth, app };