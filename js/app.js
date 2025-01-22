
//home page part

// Function to toggle visibility of a card's details div
function toggleDetails(card) {
    const detailsDiv = card.querySelector('.details'); // Get the details div inside the card
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}

// Function to handle click event on buttons inside a card
function handleButtonClick( quiz, card) {
    const buttons = card.querySelectorAll('.details button');
    const catagory = document.querySelector(".catagory") // Select all buttons in the card
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            quiz.style.display = 'block'; // Show the form
            catagory.style.display = 'none'; // Hide the current card (optional)
        });
    });
}

// Function to initialize event listeners for cards
function initializeCards() {
    const cards = document.querySelectorAll('.card'); // Select all cards
    const quiz = document.querySelector('.app'); // Assuming .form exists

    cards.forEach(card => {
        const imageNav = card.querySelector('#image'); // Get the image element inside the card
        if (imageNav) {
            imageNav.addEventListener('click', () => toggleDetails(card)); // Add click event to toggle details
        }

        if (    quiz) {
            handleButtonClick(  quiz, card); // Add click events to buttons
        }
    });
}

// Initialize everything when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initializeCards);

//Quiz part

async function initializeQuizApp(containerSelector, timerSelector, feedbackSelector, firebaseConfig) {
    // Check if the specified container is visible
    const container = document.querySelector(containerSelector);
    if (container.style.display !== 'block') return;

    // Import Firebase Firestore dependencies
    const { db } = await import(firebaseConfig);
    const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js");

    // Timer variables
    let timeLeft = 30;
    let timerInterval;

    // Firestore Document Reference
    const docRef = doc(db, "easylevel", "html");
    const docSnap = await getDoc(docRef);
    const HTML = docSnap.data();

    // Track the current question index and score
    let currentQuestionIndex = 0;
    let score = 0;

    // DOM elements
    const display = container.querySelector(".display");
    const answers = container.querySelectorAll(".button");
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
        timerElement.textContent = "30";
    }

    // Function to display the question
    function displayQuestion(index) {
        const quiz = HTML.questions[index];
        display.textContent = quiz.question;

        answers.forEach((answer, i) => {
            answer.textContent = quiz.answers[i];
            answer.dataset.correct = quiz.correct_answer === quiz.answers[i];
            answer.disabled = false;
            answer.style.borderColor = "";
        });

        feedbackElement.textContent = "";
        feedbackElement.classList.add("hidden");

        startTimer(nextQuestion);
    }

    // Function to handle an answer selection
    function handleAnswerClick(event) {
        clearInterval(timerInterval);

        const selectedAnswer = event.target;
        const quiz = HTML.questions[currentQuestionIndex];
        const isCorrect = selectedAnswer.textContent === quiz.correct_answer;

        if (isCorrect) {
            feedbackElement.textContent = "✔ Correct!";
            feedbackElement.style.color = "green";
            score++;
            selectedAnswer.style.borderColor = "green";
        } else {
            feedbackElement.textContent = "✘ Wrong!";
            feedbackElement.style.color = "red";
            selectedAnswer.style.borderColor = "red";
        }

        feedbackElement.classList.remove("hidden");

        answers.forEach(answer => {
            answer.disabled = true;
        });

        setTimeout(nextQuestion, 2000);
    }

    // Function to go to the next question
    function nextQuestion() {
        resetTimer();

        currentQuestionIndex++;

        if (currentQuestionIndex < HTML.questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            display.innerHTML = `<p>🎉 Quiz Finished! You scored ${score}/${HTML.questions.length} points.`;
            timerElement.style.display = "none";
            answers.forEach(answer => answer.style.display = "none");
        }
    }

    // Attach click event listeners to answer buttons
    answers.forEach(answer => {
        answer.addEventListener("click", handleAnswerClick);
    });

    // Start the quiz by displaying the first question
    displayQuestion(currentQuestionIndex);
}

