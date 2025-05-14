// Import Firestore instance and required Firestore methods
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Import the quiz level selector
import { ChooseLevel } from "./function/_quizLevel.js";

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', async () => {
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
          localStorage.setItem("quizData", JSON.stringify({
            subject: subject,
            level: level,
            questions: docSnap.data().questions,
            title: docSnap.data().title || `${subject} Quiz`
          }));
          
          // Redirect to quiz page
          window.location.href = `quiz.html?subject=${subject}&level=${level}`;
        } else {
          // Show error if quiz doesn't exist
          Swal.fire({
            icon: 'error',
            title: 'Quiz Not Available',
            text: `The ${level} level quiz for ${subject} is not available yet.`,
          });
        }
      } catch (error) {
        // Only show error if it wasn't a user cancellation
        if (error.message !== 'User cancelled level selection') {
          console.error("Quiz loading error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Loading Failed',
            text: 'Could not load the quiz. Please try again later.',
          });
        }
      }
    });
  });
});
