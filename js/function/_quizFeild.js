import { db } from "../firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

// DOM Elements
const questionElement = document.querySelector("#question");
const answer1 = document.querySelector('[data-answer="1"]');
const answer2 = document.querySelector('[data-answer="2"]');
const answer3 = document.querySelector('[data-answer="3"]');
const answer4 = document.querySelector('[data-answer="4"]');
const currentQuestionElement = document.querySelector("#current-question");
const totalQuestionsElement = document.querySelector("#total-questions");
const timerBarFill = document.querySelector("#timer-bar-fill");
const scoreElement = document.querySelector("#score");
const leaveBtn = document.querySelector("#leave-btn");

// Quiz state variables
let quizQuestions = [];
let currentQuestionIndex = 0;
let correctAsnwerUser = 0;
let incorrectAnswer = 0;
let unanswer = 0;
let score = 0;
let timer = null;
let timeLeft = 0;
const QUESTION_TIME = 15; // seconds per question

let quizStartTime = null;
let quizEndTime = null;

function startQuizTimer() {
  quizStartTime = new Date(); // Record start time
}

function endQuizTimer() {
  quizEndTime = new Date(); // Record end time
  const duration = calculateQuizDuration();
  localStorage.setItem("quiz-duration", duration);
}

function calculateQuizDuration() {
  if (!quizStartTime || !quizEndTime) return "0m 0s";

  const totalSeconds = Math.floor((quizEndTime - quizStartTime) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

async function initializeQuiz(quizTitle, quizLevel) {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "quizzes/"));

    if (!snapshot.exists()) {
      console.error("No quiz data available");
      return;
    }

    const quizzes = snapshot.val();
    let foundQuestions = null;

    // Find the matching quiz and difficulty level
    for (const quizId in quizzes) {
      const quiz = quizzes[quizId];
      if (quiz.title === quizTitle) {
        for (const difficulty of quiz.difficulty) {
          if (difficulty.level === quizLevel) {
            foundQuestions = difficulty.questions;
            break;
          }
        }
        if (foundQuestions) break;
      }
    }

    if (!foundQuestions || foundQuestions.length === 0) {
      console.error("No matching questions found");
      return;
    }

    quizQuestions = foundQuestions;
    totalQuestionsElement.textContent = quizQuestions.length;
    startQuiz();
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}

function startQuiz() {
  score = 0;
  correctAsnwerUser = 0;
  incorrectAnswer = 0;
  unanswer = 0;
  currentQuestionIndex = 0;
  scoreElement.textContent = score;
  startQuizTimer();
  showQuestion();
}

function showQuestion() {
  // Clear any existing timer
  clearInterval(timer);

  // Check if we have questions
  if (currentQuestionIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  const questionObj = quizQuestions[currentQuestionIndex];

  // Update UI
  currentQuestionElement.textContent = currentQuestionIndex + 1;
  questionElement.textContent = questionObj.question;

  // Set answer texts
  const options = questionObj.options;
  answer1.textContent = options[0] || "";
  answer2.textContent = options[1] || "";
  answer3.textContent = options[2] || "";
  answer4.textContent = options[3] || "";

  // Store correct answer text
  const correctAnswer = questionObj.correct_answer;

  // Reset previous click handlers and styles
  resetAnswerStyles();

  // Add new click handlers
  [answer1, answer2, answer3, answer4].forEach((el) => {
    el.onclick = () => handleAnswer(el.textContent, correctAnswer);
  });

  // Start timer
  startTimer();
}

function startTimer() {
  timeLeft = QUESTION_TIME;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const percentage = (timeLeft / QUESTION_TIME) * 100;
  timerBarFill.style.width = `${percentage}%`;

  // Change color when time is running out
  if (timeLeft <= 5) {
    timerBarFill.style.backgroundColor = "#ef4444"; // red
  } else {
    timerBarFill.style.backgroundColor = "#f97316"; // orange
  }
}

function handleAnswer(selectedAnswer, correctAnswer) {
  clearInterval(timer);

  // Highlight all answers to show which is correct
  [answer1, answer2, answer3, answer4].forEach((el) => {
    if (el.textContent === correctAnswer) {
      el.classList.add("bg-green-500");
    } else if (
      el.textContent === selectedAnswer &&
      selectedAnswer !== correctAnswer
    ) {
      el.classList.add("bg-red-500");
    }
  });

  // Update score if correct
  if (selectedAnswer === correctAnswer) {
    correctAsnwerUser += 1;
    const pointsEarned = Math.floor(timeLeft * (10 / 15));
    score += pointsEarned;
    scoreElement.textContent = score;
  } else if (selectedAnswer !== correctAnswer) {
    incorrectAnswer += 1;
  } else {
    unanswer += 1;
  }

  // Move to next question after delay
  setTimeout(() => {
    resetAnswerStyles();
    currentQuestionIndex++;
    showQuestion();
  }, 1500);
}

function handleTimeOut() {
  // Time ran out - show correct answer
  const questionObj = quizQuestions[currentQuestionIndex];
  const correctAnswer = questionObj.correct_answer;

  [answer1, answer2, answer3, answer4].forEach((el) => {
    if (el.textContent === correctAnswer) {
      el.classList.add("bg-green-500");
    }
  });

  unanswer += 1;

  // Move to next question after delay
  setTimeout(() => {
    resetAnswerStyles();
    currentQuestionIndex++;
    showQuestion();
  }, 1500);
}

function resetAnswerStyles() {
  [answer1, answer2, answer3, answer4].forEach((el) => {
    el.classList.remove("bg-green-500", "bg-red-500");
  });
}

function endQuiz() {
  endQuizTimer(); // Record final duration
  // console.log("Quiz ended! Final score:", score);
  localStorage.setItem("quiz-score", score);
  localStorage.setItem("quiz-correct", correctAsnwerUser);
  localStorage.setItem("quiz-incorrect", incorrectAnswer);
  localStorage.setItem("quiz-unanswered", unanswer);
  // localStorage.setItem("")
  window.location.href = "./result.html";
}

// Start the quiz when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const quizTitle = localStorage.getItem("quiz-title");
  const quizLevel = localStorage.getItem("quiz-level");

  if (!quizTitle || !quizLevel) {
    console.error("Quiz title or level not found in localStorage");
    // Redirect to quiz selection or show error
    window.location.href = "quiz-selection.html";
    return;
  }

  console.log("Starting quiz:", quizTitle, "with level:", quizLevel);
  initializeQuiz(quizTitle, quizLevel);
});

// Leave Btn Click
leaveBtn.addEventListener("click", async () => {
  localStorage.removeItem("quiz-title");
  localStorage.removeItem("quiz-level");
  window.location.href = "../../index.html";
});
