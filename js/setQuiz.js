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
      image: quiz.image,
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
    id: "10",
    title: "Python Programming",
    image: "python-question.png",
    description:
      "Test your knowledge of Python, a popular high-level programming language used for web development, automation, data analysis, and more.",
    difficulty: [
      {
        level: "easy",
        questions: [
          {
            question: "What is the correct file extension for Python files?",
            options: [".py", ".python", ".pt", ".pyt"],
            correct_answer: ".py",
          },
          {
            question: "Which keyword is used to define a function in Python?",
            options: ["func", "define", "def", "function"],
            correct_answer: "def",
          },
          {
            question: "How do you print something in Python?",
            options: ["echo()", "console.log()", "print()", "write()"],
            correct_answer: "print()",
          },
          {
            question:
              "Which data type is used to store a sequence of characters?",
            options: ["int", "float", "str", "char"],
            correct_answer: "str",
          },
          {
            question: "How do you start a comment in Python?",
            options: ["//", "#", "/*", "--"],
            correct_answer: "#",
          },
          {
            question: "Which of these is a valid variable name?",
            options: ["2name", "first-name", "name_1", "class"],
            correct_answer: "name_1",
          },
          {
            question: "What is the output of: `print(2 + 3 * 4)`?",
            options: ["20", "14", "24", "18"],
            correct_answer: "14",
          },
          {
            question: "Which data type is used to store True/False values?",
            options: ["int", "bool", "str", "bit"],
            correct_answer: "bool",
          },
          {
            question: "What does `len()` function do?",
            options: [
              "Returns length of an object",
              "Converts to integer",
              "Creates a list",
              "Reverses a string",
            ],
            correct_answer: "Returns length of an object",
          },
          {
            question: "Which of these is a list?",
            options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"],
            correct_answer: "[1,2,3]",
          },
        ],
      },
      {
        level: "medium",
        questions: [
          {
            question: "How do you define a class in Python?",
            options: [
              "class MyClass:",
              "Class MyClass:",
              "define class MyClass",
              "class = MyClass",
            ],
            correct_answer: "class MyClass:",
          },
          {
            question: "What is a correct syntax to import a module?",
            options: [
              "import-module math",
              "include math",
              "require math",
              "import math",
            ],
            correct_answer: "import math",
          },
          {
            question: "What is the output of `type(3.5)`?",
            options: ["float", "int", "str", "decimal"],
            correct_answer: "float",
          },
          {
            question: "Which loop runs as long as a condition is true?",
            options: ["for", "repeat", "while", "loop"],
            correct_answer: "while",
          },
          {
            question: "Which keyword is used to handle exceptions?",
            options: ["except", "try", "catch", "finally"],
            correct_answer: "try",
          },
          {
            question: "What does the `append()` method do to a list?",
            options: [
              "Adds an item",
              "Removes an item",
              "Sorts the list",
              "Duplicates the list",
            ],
            correct_answer: "Adds an item",
          },
          {
            question: "What is a dictionary in Python?",
            options: [
              "An ordered list",
              "A key-value pair collection",
              "A set",
              "A string",
            ],
            correct_answer: "A key-value pair collection",
          },
          {
            question: "How do you create a virtual environment?",
            options: [
              "python -venv",
              "python -m venv env",
              "pip create env",
              "env python start",
            ],
            correct_answer: "python -m venv env",
          },
          {
            question: "Which of the following is not a Python keyword?",
            options: ["lambda", "return", "define", "global"],
            correct_answer: "define",
          },
          {
            question: "Which method is used to convert a string to lowercase?",
            options: [
              "str.lower()",
              "str.toLower()",
              "str.down()",
              "str.to_lowercase()",
            ],
            correct_answer: "str.lower()",
          },
        ],
      },
      {
        level: "hard",
        questions: [
          {
            question: "What is the output of `bool([])`?",
            options: ["True", "False", "None", "Error"],
            correct_answer: "False",
          },
          {
            question: "What is a lambda function?",
            options: [
              "Named function",
              "Loop function",
              "Anonymous function",
              "Recursive function",
            ],
            correct_answer: "Anonymous function",
          },
          {
            question: "Which method is used to add an item to a set?",
            options: ["append()", "add()", "insert()", "include()"],
            correct_answer: "add()",
          },
          {
            question: "How are arguments passed in Python?",
            options: [
              "By value",
              "By reference",
              "By pointer",
              "By object reference",
            ],
            correct_answer: "By object reference",
          },
          {
            question: "What is the difference between `is` and `==`?",
            options: [
              "No difference",
              "`is` checks identity, `==` checks value",
              "`is` checks type, `==` checks address",
              "`is` checks value, `==` checks identity",
            ],
            correct_answer: "`is` checks identity, `==` checks value",
          },
          {
            question: "Which method is used to remove duplicates from a list?",
            options: ["set()", "distinct()", "unique()", "remove_duplicates()"],
            correct_answer: "set()",
          },
          {
            question: "What is a generator in Python?",
            options: [
              "Function that returns a list",
              "Function that uses `yield`",
              "Function that loops forever",
              "Class that builds objects",
            ],
            correct_answer: "Function that uses `yield`",
          },
          {
            question: "What is the purpose of `__init__` in a class?",
            options: [
              "Destroys object",
              "Initializes attributes",
              "Inherits a class",
              "Returns a string",
            ],
            correct_answer: "Initializes attributes",
          },
          {
            question:
              "Which built-in function returns the memory location of an object?",
            options: ["id()", "mem()", "loc()", "ref()"],
            correct_answer: "id()",
          },
          {
            question: "How do you handle multiple exceptions in Python?",
            options: [
              "try except1 except2",
              "try except (Exception1, Exception2)",
              "try catch1 catch2",
              "try except: Exception1, Exception2",
            ],
            correct_answer: "try except (Exception1, Exception2)",
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
