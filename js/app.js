
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

// Wait for DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", async () => {
  // Get all quiz start buttons
  const startBtn = document.querySelectorAll("button[type='button']");

  // Add click handlers to each button
  startBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        const subject = btn.id; // Get subject from button ID (e.g., "math")

        // Show level selector and wait for user choice
        const { quizId, level } = await ChooseLevel(subject);

        // Reference to the quiz document in Firestore
        // Assuming structure: /levels/{level}/subjects/{subject}
        const docRef = doc(db, "levels", level, "subjects", subject);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Store quiz data for the quiz page
          localStorage.setItem(
            "quizData",
            JSON.stringify({
              subject: subject,
              level: level,
              questions: docSnap.data().questions,
              title: docSnap.data().title || `${subject} Quiz`,
            })
          );

          // Redirect to quiz page
          window.location.href = `quiz.html?subject=${subject}&level=${level}`;
        } else {
          // Show error if quiz doesn't exist
          Swal.fire({
            icon: "error",
            title: "Quiz Not Available",
            text: `The ${level} level quiz for ${subject} is not available yet.`,
          });
        }
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
