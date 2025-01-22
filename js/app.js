// Import Firestore instance and required Firestore methods
import { db } from "./firebase.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

async function initializeQuizApp(containerSelector, timerSelector, feedbackSelector) {

    // Get the quiz container
    const container = document.querySelector(containerSelector);
    if (!container || container.style.display !== 'block') return;
  
    try {
      
  
      // Timer variables
      let timeLeft = 30;
      let timerInterval;
  
      // Firestore Document Reference
      const docRef = doc(db, 'easylevel', 'html'); // Adjust level/topic dynamically if needed
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.error('No quiz data found!');
        return;
      }
  
      const quizData = docSnap.data();
  
      // Track the current question index and score
      let currentQuestionIndex = 0;
      let score = 0;
  
      // DOM elements
      const display = container.querySelector('.display h2');
      const answers = container.querySelectorAll('.button');
      const timerElement = document.querySelector(timerSelector);
      const feedbackElement = document.querySelector(feedbackSelector);
  
      // Function to start the timer
      function startTimer(onTimeUp) {
        clearInterval(timerInterval);
        timeLeft = 30;
        timerElement.textContent = timeLeft;
  
        timerInterval = setInterval(() => {
          timeLeft--;
          timerElement.textContent = timeLeft;
  
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            onTimeUp();
          }
        }, 1000);
      }
  
      // Function to reset the timer
      function resetTimer() {
        clearInterval(timerInterval);
        timerElement.textContent = '30';
      }
  
      // Function to display a question
      function displayQuestion(index) {
        const quiz = quizData.questions[index];
        display.textContent = quiz.question;
  
        answers.forEach((answer, i) => {
          answer.textContent = quiz.answers[i];
          answer.dataset.correct = quiz.correct_answer === quiz.answers[i];
          answer.disabled = false;
          answer.style.borderColor = '';
        });
  
        feedbackElement.textContent = '';
        feedbackElement.classList.add('hidden');
  
        startTimer(nextQuestion);
      }
  
      // Function to handle answer selection
      function handleAnswerClick(event) {
        clearInterval(timerInterval);
  
        const selectedAnswer = event.target;
        const quiz = quizData.questions[currentQuestionIndex];
        const isCorrect = selectedAnswer.textContent === quiz.correct_answer;
  
        if (isCorrect) {
          feedbackElement.textContent = '✔ Correct!';
          feedbackElement.style.color = 'green';
          score++;
          selectedAnswer.style.borderColor = 'green';
        } else {
          feedbackElement.textContent = '✘ Wrong!';
          feedbackElement.style.color = 'red';
          selectedAnswer.style.borderColor = 'red';
        }
  
        feedbackElement.classList.remove('hidden');
  
        answers.forEach(answer => {
          answer.disabled = true;
        });
  
        setTimeout(nextQuestion, 2000);
      }
  
      // Function to go to the next question
      function nextQuestion() {
        resetTimer();
  
        currentQuestionIndex++;
  
        if (currentQuestionIndex < quizData.questions.length) {
          displayQuestion(currentQuestionIndex);
        } else {
          display.innerHTML = `<p>🎉 Quiz Finished! You scored ${score}/${quizData.questions.length} points.</p>`;
          timerElement.style.display = 'none';
          answers.forEach(answer => (answer.style.display = 'none'));
        }
      }
  
      // Attach click event listeners to answer buttons
      answers.forEach(answer => {
        answer.addEventListener('click', handleAnswerClick);
      });
  
      // Start the quiz by displaying the first question
      displayQuestion(currentQuestionIndex);
    } catch (error) {
      console.error('Error initializing quiz app:', error);
    }
  }


// Home Page Logic

// Function to toggle visibility of a card's details div
function toggleDetails(card) {
    const detailsDiv = card.querySelector('.details');
    if (detailsDiv) {
        detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
    }
}

// Function to handle button clicks for navigating to the quiz
function handleButtonClick(quizContainer, card) {
    const buttons = card.querySelectorAll('.details button');
    const categorySection = document.querySelector('.catagory');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked!'); // Debugging line
            if (quizContainer) quizContainer.style.display = 'block'; // Show the quiz container
            if (categorySection) categorySection.style.display = 'none'; // Hide the categories section
            initializeQuizApp('.app', '#timer', '#feedback', './firebase-config.js');
        });
    });
}

// Function to initialize event listeners for cards
function initializeCards() {
    const cards = document.querySelectorAll('.card');
    const quizContainer = document.querySelector('.app');

    cards.forEach(card => {
        const imageNav = card.querySelector('nav#image img');
        if (imageNav) {
            imageNav.addEventListener('click', () => toggleDetails(card));
        }

        if (quizContainer) {
            handleButtonClick(quizContainer, card);
        }
    });
}

// Initialize home page functionality
document.addEventListener('DOMContentLoaded', initializeCards);