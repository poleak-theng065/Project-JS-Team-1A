import { db } from "./firebase.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Function to set quiz data in the database
  function setQuiz(quiz) {
    // Changed parameter name to 'quiz' since we're passing the quiz object
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
    id: "4",
    title: "general-computing-quiz",
    description: "Test your general computing knowledge",
    difficulty: [
      {
        level: "easy",
        questions: [
          {
            question: "What does CPU stand for?",
            options: [
              "Central Processing Unit",
              "Computer Processing Unit",
              "Central Process Unit",
            ],
            correct_answer: "Central Processing Unit",
          },
          {
            question: "Which of these is not an operating system?",
            options: ["Linux", "Windows", "Excel"],
            correct_answer: "Excel",
          },
        ],
      },
      {
        level: "medium",
        questions: [
          {
            question: "What does RAM stand for?",
            options: [
              "Random Access Memory",
              "Read-Only Memory",
              "Rapid Access Memory",
            ],
            correct_answer: "Random Access Memory",
          },
          {
            question: "Which protocol is used to send email?",
            options: ["SMTP", "HTTP", "FTP"],
            correct_answer: "SMTP",
          },
        ],
      },
      {
        level: "hard",
        questions: [
          {
            question: "What does the 'B' in BIOS stand for?",
            options: ["Basic", "Binary", "Boot"],
            correct_answer: "Basic",
          },
          {
            question: "Which of these is a type of computer architecture?",
            options: ["Von Neumann", "Albert Einstein", "Stephen Hawking"],
            correct_answer: "Von Neumann",
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
});
