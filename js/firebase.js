
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBo5PHjekEhLKwr8-DvwZoQNaKhrwnHlTs",
    authDomain: "quizapp-e2cc2.firebaseapp.com",
    projectId: "quizapp-e2cc2",
    storageBucket: "quizapp-e2cc2.firebasestorage.app",
    messagingSenderId: "734105146347",
    appId: "1:734105146347:web:e25b3fde43fda4bba63fae",
    measurementId: "G-S043X4L367"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  export{ db };
  
