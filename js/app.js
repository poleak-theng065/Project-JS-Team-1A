import { db } from "./firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const dbRef = ref(db);

//check if user is logged in
document.addEventListener("DOMContentLoaded", async () => {
  let userUid = localStorage.getItem("user-uid");

  const dbRef = ref(db);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      get(child(dbRef, "users/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const userID = snapshot.val().id;
          const userData = snapshot.val();
          if (userID !== userUid) {
            window.location.href = "page/auth/login.html";
          } else {
            console.log("You are logged in as: " + userData.fullname);
          }
        } else {
          console.log("No data available");
        }
      });
    } else {
      console.log("User not signed in");
      window.location.href = "page/auth/login.html";
    }
  });
});

//display quiz we have in database
import { displayQuiz } from "./function/_quizDisplay.js";
document.addEventListener("DOMContentLoaded", async () => {
  get(child(dbRef, "quizzes/")).then((snapshot) => {
    if (snapshot.exists()){
      const quizzes = snapshot.val();
      displayQuiz(quizzes)
    } else {
      console.error(error)
    }
  })
});

