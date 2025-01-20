// Import Firestore instance and required Firestore methods
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const docRef = doc(db, "easylevel", "html");
const docSnap = await getDoc(docRef);

const HTML = docSnap.data();
const display = document.querySelector(".display");
const answers = document.querySelectorAll(".button");

let currentQuestionIndex = 0;

function displayQuestion(index) {
    const quiz = HTML.questions[index];
    display.textContent = quiz.question;
    for (let i in quiz.answers) {
        answers[i].textContent = quiz.answers[i];
        answers[i].dataset.correct = quiz.correct_answer === quiz.answers[i];
    }
}

function handleAnswerClick(event) {
    const selectedAnswer = event.target;
    const correctAnswer = HTML.questions[currentQuestionIndex].correct_answer;
    const isCorrect = selectedAnswer.textContent === correctAnswer;

    if (isCorrect) {
        selectedAnswer.style.borderColor = "green";
    } else {
        selectedAnswer.style.borderColor = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < HTML.questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            display.textContent = "Quiz completed!";
            answers.forEach(answer => answer.style.display = "none");
        }
        answers.forEach(answer => answer.style.borderColor = ""); // Reset border color
    }, 1000);
}

answers.forEach(answer => {
    answer.addEventListener("click", handleAnswerClick);
});

// Display the first question initially
displayQuestion(currentQuestionIndex);