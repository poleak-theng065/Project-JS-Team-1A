
import { db } from "./firebase.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

//check if user is logged in
document.addEventListener("DOMContentLoaded", async () => {
  let userUid = localStorage.getItem("user-uid");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const dbRef = ref(db);
      get(child(dbRef, "users/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const userID = snapshot.val().id;
          const userData = snapshot.val();
          if (userID !== userUid){
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

        console.log("Selected quiz ID:", quizId , "Level:", level);
        
        

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
