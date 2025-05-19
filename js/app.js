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
    }
  });
});

//display quiz we have in database
import { displayQuize } from "./function/_quizDisplay.js";
document.addEventListener("DOMContentLoaded", async () => {
  get(child(dbRef, "quizzes/")).then((snapshot) => {
    if (snapshot.exists()){
      const quizzes = snapshot.val();
      displayQuize(quizzes)
    } else {
      console.error(error)
    }
  })
});

// Import the quiz level selector
import { ChooseLevel } from "./function/_quizLevel.js";

//feature: quiz level selection
document.addEventListener("DOMContentLoaded", async () => {
  const startBtn = document.querySelectorAll("button[type='button']");

  startBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const subject = btn.id;

        const { quizId, level } = await ChooseLevel(subject);

        console.log("Selected quiz ID:", quizId, "Level:", level);
      } catch (error) {
        // Only show error if it wasn't a user cancellation
        if (error.message !== "User cancelled level selection") {
          console.error("Quiz loading error:", error);
          Swal.fire({
            icon: "error",
            title: "Loading Failed",
            text: "Could not load the quiz. Please try again later.",
          });
        }
      }
    });
  });
});
