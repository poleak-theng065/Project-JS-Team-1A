import { db } from "../firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// DOM Elements
const elements = {
  quizName: document.querySelector("#quiz-name"),
  quizLevel: document.querySelector("#level"),
  correctAnswer: document.querySelector("#correct-answers"),
  incorrectAnswer: document.querySelector("#incorrect-answers"),
  unanswered: document.querySelector("#unanswered"),
  quizDuration: document.querySelector("#quiz-duration"),
  quizScore: document.querySelector("#score"),
  quizScoreFill: document.querySelector("#scoreFill"),
  backBtn: document.querySelector("#backBtn"),
  reQuizBtn: document.querySelector("#reQuizBtn"),
};

// Initialize and display quiz results
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Script Success!");
  displayQuizResults();
  setupEventListeners();
  updateUserProgression();
});

function displayQuizResults() {
  elements.quizName.textContent =
    localStorage.getItem("quiz-title") || "Unknown Quiz";
  elements.quizLevel.textContent =
    localStorage.getItem("quiz-level") || "Unknown Level";
  elements.correctAnswer.textContent =
    localStorage.getItem("quiz-correct") || 0;
  elements.incorrectAnswer.textContent =
    localStorage.getItem("quiz-incorrect") || 0;
  elements.unanswered.textContent =
    localStorage.getItem("quiz-unanswered") || 0;

  const score = parseInt(localStorage.getItem("quiz-score")) || 0;
  elements.quizScore.textContent = score;
  elements.quizScoreFill.style.width = `${Math.min(score, 100)}%`; // Cap at 100% for display

  elements.quizDuration.textContent =
    localStorage.getItem("quiz-duration") || "0m 0s";
}

function setupEventListeners() {
  elements.backBtn.addEventListener("click", () => {
    clearQuizStorage();
    window.location.href = "../../index.html";
    const quizItem = ["quiz-title", "quiz-level"];
    quizItem.forEach((item) => {
      localStorage.removeItem(item);
    });
  });

  elements.reQuizBtn.addEventListener("click", () => {
    clearQuizStorage();
    window.location.href = "./quiz.html";
  });
}

function clearQuizStorage() {
  const itemsToRemove = [
    "quiz-correct",
    "quiz-incorrect",
    "quiz-unanswered",
    "quiz-score",
    "quiz-duration",
  ];

  itemsToRemove.forEach((item) => localStorage.removeItem(item));
}

function updateUserProgression() {
  let userUid = localStorage.getItem("user-uid");
  const auth = getAuth();
  const dbRef = ref(db);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      get(child(dbRef, "users/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const userID = snapshot.val().id;
          const userData = snapshot.val();
          if (userID !== userUid) {
            console.log("User ID mismatch");
          } else {
            console.log("You are logged in as: " + userData.fullname);
            return update(child(dbRef, "users/" + user.uid), {
              id: userData.id,
              fullname: userData.fullname,
              email: userData.email,
              // Removed password storage - it's not secure!

              "user-progression": {
                "highest-score": findHighestScore(
                  userData["user-progression"]["highest-score"]
                ),
                "total-score": sumTotalScore(
                  userData["user-progression"]["total-score"]
                ),
                "quizzes-completed":
                  userData["user-progression"]["quizzes-completed"] + 1,
                "daily-streak": userData["user-progression"]["daily-streak"],
              },
              "user-costume-quizzes": userData["user-costume-quizzes"] || [],
            });
          }
        } else {
          console.log("No data available");
        }
      });
    } else {
      console.log("User not signed in");
    }
  });
}

function sumTotalScore(userTotalScore) {
  const quizScore = parseInt(localStorage.getItem("quiz-score")) || 0;
  return userTotalScore + quizScore;
}

function findHighestScore(userHighestScore) {
  const quizScore = parseInt(localStorage.getItem("quiz-score")) || 0;
  return Math.max(userHighestScore, quizScore);
}
