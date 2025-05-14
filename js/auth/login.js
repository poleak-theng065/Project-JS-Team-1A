import { db } from "../firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleLogin();
    });

    // Also handle button click for better UX
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleLogin();
    });

    async function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('input[type="checkbox"]').checked;

        // Validate inputs
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        try {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Optionally store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }

            // Store user data in session
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                sessionStorage.setItem('userData', JSON.stringify(userDoc.data()));
            }

            // Redirect to home page
            window.location.href = "../index.html";

        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = "Login failed. Please try again.";
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many attempts. Try again later.";
                    break;
            }
            
            showError(errorMessage);
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Log In';
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('invisible');
        errorMessage.classList.add('visible');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.remove('visible');
            errorMessage.classList.add('invisible');
        }, 5000);
    }

    // Check for remember me on page load
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.querySelector('input[type="checkbox"]').checked = true;
        }
    }
});