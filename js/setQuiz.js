import { db } from "./firebase";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

// // Function to set quiz data in the database
// function setQuiz(quiz) {  // Changed parameter name to 'quiz' since we're passing the quiz object
//     const quizRef = ref(db, "quizzes/" + quiz.id);
//     set(quizRef, {
//         title: quiz.title,
//         description: quiz.description,
//         difficulty: quiz.difficulty.map((level) => ({
//             level: level.level,
//             questions: level.questions.map((question) => ({
//                 question: question.question,
//                 options: question.options,
//                 correct_answer: question.correct_answer,
//             })),
//         })),
//     })
//     .then(() => {
//         console.log("Quiz data set successfully");
//     })
//     .catch((error) => {
//         console.error("Error setting quiz data:", error);
//     });
// }

// const quizContainer = {
//     id: "1",
//     title: "html-quiz",
//     description: "Test your HTML knowledge",
//     difficulty: [
//         {
//             level: "easy",
//             questions: [
//                 {
//                     question: "What does HTML stand for?",
//                     options: [
//                         "Hyper Text Markup Language",
//                         "High Text Markup Language",
//                         "Hyper Tabular Markup Language",
//                     ],
//                     correct_answer: "Hyper Text Markup Language",
//                 },
//                 {
//                     question: "Who is making the Web standards?",
//                     options: ["Mozilla", "Microsoft", "The World Wide Web Consortium"],
//                     correct_answer: "The World Wide Web Consortium",
//                 },
//             ],
//         },
//         {
//             level: "medium",
//             questions: [
//                 {
//                     question: "What is the correct HTML element for inserting a line break?",
//                     options: ["<break>", "<br>", "<lb>"],
//                     correct_answer: "<br>",
//                 },
//                 {
//                     question: "What is the correct HTML for creating a hyperlink?",
//                     options: [
//                         "<a>http://www.example.com</a>",
//                         "<a href='http://www.example.com'>Example</a>",
//                         "<link>http://www.example.com</link>",
//                     ],
//                     correct_answer: "<a href='http://www.example.com'>Example</a>",
//                 },
//             ],
//         },
//     ],
// };

// Function to set quiz data in the database
function setQuiz(quiz) {
    const quizRef = ref(db, "quizzes/" + quiz.id);
    set(quizRef, {
        title: quiz.title,
        description: quiz.description,
        difficulty: quiz.difficulty.map((level) => ({
            level: level.level,
            questions: level.questions.map((question) => ({
                question: question.question,
                options: question.options,
                correct_answer: question.correct_answer,
            })),
        })),
    })
    .then(() => {
        console.log("Quiz data set successfully");
    })
    .catch((error) => {
        console.error("Error setting quiz data:", error);
    });
}

const quizContainer = {
    id: "1",
    title: "html-quiz",
    description: "Test your HTML knowledge",
    difficulty: [
        {
            level: "easy",
            questions: [
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Text Markup Language",
                        "Hyper Tabular Markup Language",
                    ],
                    correct_answer: "Hyper Text Markup Language",
                },
                {
                    question: "Who is making the Web standards?",
                    options: ["Mozilla", "Microsoft", "The World Wide Web Consortium"],
                    correct_answer: "The World Wide Web Consortium",
                },
            ],
        },
        {
            level: "medium",
            questions: [
                {
                    question: "What is the correct HTML element for inserting a line break?",
                    options: ["<break>", "<br>", "<lb>"],
                    correct_answer: "<br>",
                },
                {
                    question: "What is the correct HTML for creating a hyperlink?",
                    options: [
                        "<a>http://www.example.com</a>",
                        "<a href='http://www.example.com'>Example</a>",
                        "<link>http://www.example.com</link>",
                    ],
                    correct_answer: "<a href='http://www.example.com'>Example</a>",
                },
            ],
        },
    ],
};

const setQuizBtn = document.getElementById("set-quiz-btn");
setQuizBtn.addEventListener("click", () => {
    setQuiz(quizContainer);
    console.log("btn work");
});