// Import Firebase modules
import { db } from "../firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// DOM elements
const registerForm = document.querySelector('form');
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Password toggle functions
window.togglePassword = function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  const eyeIcon = document.getElementById('eyeIcon');
  eyeIcon.classList.toggle('fa-eye-slash');
  eyeIcon.classList.toggle('fa-eye');
};

window.toggleConfirmPassword = function() {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  const eyeIconConfirm = document.getElementById('eyeIconConfirm');
  eyeIconConfirm.classList.toggle('fa-eye-slash');
  eyeIconConfirm.classList.toggle('fa-eye');
};

// Form submission handler
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters');
    return;
  }

  try {
    // Disable submit button during registration
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Realtime Database
    await set(ref(db, 'users/' + user.uid), {
      fullName: fullName,
      email: email,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      quizScores: {}, // Initialize empty object for future quiz scores
      totalScore: 0,
      role: "user" // Default role
    });

    // Registration successful
    alert('Registration successful!');
    window.location.href = 'logIn.html'; // Redirect to login page
    
  } catch (error) {
    console.error('Registration error:', error);
    let errorMessage = 'Registration failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email is already in use.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
    }
    
    alert(errorMessage);
  } finally {
    // Re-enable submit button
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register';
    }
  }
});