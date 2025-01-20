// Timer variables
let timeLeft = 30; // Countdown starts at 30 seconds
let timerInterval; // To track the timer interval

// Question data (10 JavaScript-related questions)
const questions = [
  {
    text: "What does 'DOM' stand for in JavaScript?",
    options: ["Document Object Model", "Data Object Method", "Desktop Object Manager", "Data-Oriented Model"],
    correctAnswer: 1, // 1-based index
  },
  {
    text: "Which of the following is a JavaScript data type?",
    options: ["String", "Integer", "Float", "Byte"],
    correctAnswer: 1,
  },
  {
    text: "How do you declare a JavaScript variable?",
    options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
    correctAnswer: 1,
  },
  {
    text: "Which method is used to convert JSON to a JavaScript object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.objectify()", "JSON.toObject()"],
    correctAnswer: 2,
  },
  {
    text: "What keyword is used to define a constant in JavaScript?",
    options: ["let", "var", "constant", "const"],
    correctAnswer: 4,
  },
  {
    text: "What will `typeof null` return in JavaScript?",
    options: ["null", "undefined", "object", "number"],
    correctAnswer: 3,
  },
  {
    text: "What is the result of `2 + '2'` in JavaScript?",
    options: ["4", "22", "NaN", "Error"],
    correctAnswer: 2,
  },
  {
    text: "Which of these is NOT a JavaScript framework or library?",
    options: ["React", "Angular", "Laravel", "Vue"],
    correctAnswer: 3,
  },
  {
    text: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    correctAnswer: 1,
  },
  {
    text: "What does the `===` operator do in JavaScript?",
    options: [
      "Compares values and types",
      "Assigns a value",
      "Checks only equality of values",
      "None of the above",
    ],
    correctAnswer: 1,
  },
];

// Track the current question index and score
let currentQuestionIndex = 0;
let score = 0; // Initialize the score

// Function to start the timer
function startTimer(onTimeUp) {
  clearInterval(timerInterval); // Clear any existing timer
  timeLeft = 30; // Reset time to 30 seconds
  document.getElementById("timer").textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

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
  document.getElementById("timer").textContent = "30"; // Reset display
}

// Function to display the question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex]; // Get the current question

  // Set the question text
  document.getElementById("question-text").textContent = currentQuestion.text;

  // Set the options text
  let buttons = document.querySelectorAll("#question-container button");
  currentQuestion.options.forEach((option, index) => {
    buttons[index].textContent = option;
    buttons[index].disabled = false; // Enable the buttons
    buttons[index].style.backgroundColor = "#757dd8"; // Reset button color
  });

  // Clear feedback
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").classList.add("hidden");

  // Start the timer, move to the next question when time runs out
  startTimer(nextQuestion);
}

// Function to handle an answer selection
function answerQuestion(selectedOption) {
  clearInterval(timerInterval); // Stop the timer when an answer is clicked

  const currentQuestion = questions[currentQuestionIndex];
  const feedbackElement = document.getElementById("feedback");
  const correctAnswerIndex = currentQuestion.correctAnswer - 1; // Convert to 0-based

  // Check if the selected option is correct
  if (selectedOption === currentQuestion.correctAnswer) {
    feedbackElement.textContent = "✔ Correct!";
    feedbackElement.style.color = "green";
    score++; // Increment the score for a correct answer
  } else {
    feedbackElement.textContent = `✘ Wrong! The correct answer is: 
    ${currentQuestion.options[correctAnswerIndex]}`;
    feedbackElement.style.color = "red";
  }

  // Show feedback
  feedbackElement.classList.remove("hidden");

  // Highlight the correct answer
  let buttons = document.querySelectorAll("#question-container button");
  buttons[correctAnswerIndex].style.backgroundColor = "green";

  // Disable all buttons
  buttons.forEach(button => {
    button.disabled = true;
  });

  // Move to the next question after 2 seconds
  setTimeout(nextQuestion, 2000);
}

// Function to go to the next question
function nextQuestion() {
  resetTimer(); // Reset the timer

  currentQuestionIndex++; // Move to the next question

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    displayQuestion(); // Display the next question
  } else {
    // If no more questions, show the score and quiz completion message
    document.getElementById("question-container").innerHTML =
      `<p>🎉 Quiz Finished! You scored ${score}/${questions.length} points. Thanks for playing!</p>`;
    document.getElementById("timer-container").style.display = "none"; // Hide the timer
  }
}

// Start the quiz
displayQuestion();
