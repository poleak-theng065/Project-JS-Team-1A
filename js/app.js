import { db } from "./firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
  update
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const dbRef = ref(db);

//check if user is logged in
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const auth = getAuth();
    const storedUid = localStorage.getItem("user-uid");

    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Clean up the listener immediately
        resolve(user);
      });
    });

    if (!user) {
      console.log("User not signed in - redirecting to login");
      window.location.href = "page/auth/login.html";
      return;
    }

    // Verify stored UID matches authenticated user
    if (storedUid !== user.uid) {
      console.warn("Stored UID mismatch - redirecting to login");
      window.location.href = "page/auth/login.html";
      return;
    }

    const userRef = child(dbRef, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("No user data found - redirecting to login");
      window.location.href = "page/auth/login.html";
      return;
    }

    const userData = snapshot.val();

    // Additional verification that database UID matches
    if (userData.id !== user.uid) {
      console.error("Database UID mismatch - potential security issue");
      window.location.href = "page/auth/login.html";
      return;
    }

    console.log(`Authenticated as: ${userData.fullname}`);
    // Display total score
    displayTotalScore(userData["user-progression"]["total-score"]);

    // Display user name
    displayUserName(userData.fullname);

    // Prepare updated data
    const updatedData = {
      id: user.uid, // Use the auth UID as source of truth
      fullname: userData.fullname,
      email: userData.email,
      "user-progression": {
        "highest-score": userData["user-progression"]?.["highest-score"] || 0,
        "total-score": userData["user-progression"]?.["total-score"] || 0,
        "quizzes-completed": userData["user-progression"]?.["quizzes-completed"] || 0,
        "daily-streak": setDailyStreak(userData["user-progression"]?.["daily-streak"] || 0),
      },
      "user-costume-quizzes": userData["user-costume-quizzes"] || [],
    };

    // Update user data
    await update(child(dbRef, `users/${user.uid}`), updatedData);
    console.log("User data updated successfully");

  } catch (error) {
    console.error("Authentication error:", error);
    window.location.href = "page/auth/login.html";
  }
});

// Function to set daily streak
function setDailyStreak(currentStreak) {
  const today = new Date();
  const lastLoginDate = new Date(localStorage.getItem("last-login-date"));

  // Check if the last login was yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (lastLoginDate.toDateString() === yesterday.toDateString()) {
    return currentStreak + 1; // Increment streak
  } else if (lastLoginDate.toDateString() === today.toDateString()) {
    return currentStreak; // No change
  } else {
    return 1; // Reset streak
  }
}

//display quiz we have in database
import { displayQuiz } from "./function/_quizDisplay.js";
document.addEventListener("DOMContentLoaded", async () => {
  get(child(dbRef, "quizzes/")).then((snapshot) => {
    if (snapshot.exists()) {
      const quizzes = snapshot.val();
      displayQuiz(quizzes);
    } else {
      console.error(error);
    }
  });
});

// Function to display user name
function displayUserName(userName) {
  const userNameElement = document.getElementById("user-name");
  userNameElement.textContent = `${userName}`;
}

// Function display Total Score
function displayTotalScore(totalScore) {
  const totalScoreElement = document.getElementById("total-score");
  totalScoreElement.textContent = `${totalScore}`;
}