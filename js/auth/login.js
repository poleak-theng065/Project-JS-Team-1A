import { db, auth } from '../firebase.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Form elements
const email = document.getElementById("email");
const password = document.getElementById("password");


// Submit button event
const submitBtn = document.getElementById("loginBtn");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const emailValue = email.value;
  const passwordValue = password.value;

  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      const user = userCredential.user;
        // alert("User login successfully!");
        localStorage.setItem("user-uid", user.uid);
    })
    .then(() => {
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
});