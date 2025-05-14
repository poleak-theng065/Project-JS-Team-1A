// register.js
import { db, auth } from '../firebase.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";



// Form elements
const username = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");


// Submit button event
const submitBtn = document.getElementById("registerBtn");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set initial user data (remove password storage!)
      return set(ref(db, "users/" + user.uid), {
        id: user.uid,
        fullname: usernameValue,
        email: emailValue,
        // Removed password storage - it's not secure!

        "user-progression": {
          "highest-score": 0,
          "total-score": 0,
          "quizzes-completed": 0,
          "daily-streak": 0
        },
        "user-costume-quizzes": []
      });
    })
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    });
});