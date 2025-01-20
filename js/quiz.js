// Import Firestore instance and required Firestore methods
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Timer variables
let timeLeft = 30; // Countdown starts at 30 seconds
let timerInterval; // To track the timer interval

// Firestore Document Reference
const docRef = doc(db, "easylevel", "html");
const docSnap = await getDoc(docRef);
const HTML = docSnap.data();

// Track the current question index and score
let currentQuestionIndex = 0;
let score = 0; // Initialize the score

// DOM elements
const display = document.querySelector(".display");
const answers = document.querySelectorAll(".button");
const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");

// Function to start the timer
function startTimer(onTimeUp) {
  clearInterval(timerInterval); // Clear any existing timer
  timeLeft = 30; // Reset time to 30 seconds
  timerElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    // If time runs out, go to the next question
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeUp(); // Call the function when time is up
    }
  }, 1000);
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval); // Stop the timer
  timerElement.textContent = "30"; // Reset display
}

// Function to display the question
function displayQuestion(index) {
  const quiz = HTML.questions[index];
  display.textContent = quiz.question;

  answers.forEach((answer, i) => {
    answer.textContent = quiz.answers[i];
    answer.dataset.correct = quiz.correct_answer === quiz.answers[i];
    answer.disabled = false; // Enable buttons
    answer.style.borderColor = ""; // Reset border color
  });

  feedbackElement.textContent = "";
  feedbackElement.classList.add("hidden");

  // Start the timer, move to the next question when time runs out
  startTimer(nextQuestion);
}

// Function to handle an answer selection
function handleAnswerClick(event) {
  clearInterval(timerInterval); // Stop the timer when an answer is clicked

  const selectedAnswer = event.target;
  const quiz = HTML.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer.textContent === quiz.correct_answer;

  if (isCorrect) {
    feedbackElement.textContent = "✔ Correct!";
    feedbackElement.style.color = "green";
    score++; // Increment the score for a correct answer
    selectedAnswer.style.borderColor = "green";
  } else {
    feedbackElement.textContent = `✘ Wrong!`;
    feedbackElement.style.color = "red";
    selectedAnswer.style.borderColor = "red";
  }

  feedbackElement.classList.remove("hidden");

  // Disable all buttons
  answers.forEach(answer => {
    answer.disabled = true;
  });

  // Move to the next question after 2 seconds
  setTimeout(nextQuestion, 2000);
}

// Function to go to the next question
function nextQuestion() {
  resetTimer(); // Reset the timer

  currentQuestionIndex++; // Move to the next question

  // Check if there are more questions
  if (currentQuestionIndex < HTML.questions.length) {
    displayQuestion(currentQuestionIndex); // Display the next question
  } else {
    // If no more questions, show the score and quiz completion message
    display.innerHTML = `<p>🎉 Quiz Finished! You scored ${score}/${HTML.questions.length} points.`;
    timerElement.style.display = "none"; // Hide the timer
    answers.forEach(answer => answer.style.display = "none");
  }
}

// Attach click event listeners to answer buttons
answers.forEach(answer => {
  answer.addEventListener("click", handleAnswerClick);
});

// Start the quiz by displaying the first question
displayQuestion(currentQuestionIndex);
