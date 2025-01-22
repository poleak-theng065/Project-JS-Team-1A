import { db } from "./firebase.js";
import { collection, addDoc, getDocs, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


// JSON data
const quizData = {
    "subject": "JavaScript",
    "questions": [
      {
        "question": "What will `console.log(typeof NaN)` output?",
        "answers": [
          "number",
          "NaN",
          "undefined",
          "string"
        ],
        "correct_answer": "number"
      },
      {
        "question": "Which method is used to add new elements to the beginning of an array?",
        "answers": [
          "push()",
          "unshift()",
          "shift()",
          "concat()"
        ],
        "correct_answer": "unshift()"
      },
      {
        "question": "What does `this` refer to in a regular function?",
        "answers": [
          "The global object",
          "The object calling the function",
          "The function itself",
          "Undefined"
        ],
        "correct_answer": "The global object"
      },
      {
        "question": "Which of the following is a way to create a new object in JavaScript?",
        "answers": [
          "Object.create()",
          "new Object()",
          "{}",
          "All of the above"
        ],
        "correct_answer": "All of the above"
      },
      {
        "question": "What will `console.log('5' + 5)` output?",
        "answers": [
          "10",
          "55",
          "'55'",
          "Error"
        ],
        "correct_answer": "'55'"
      },
      {
        "question": "How can you check if a variable is an array in JavaScript?",
        "answers": [
          "typeof variable === 'array'",
          "variable instanceof Array",
          "Array.isArray(variable)",
          "Both 'variable instanceof Array' and 'Array.isArray(variable)'"
        ],
        "correct_answer": "Both 'variable instanceof Array' and 'Array.isArray(variable)'"
      },
      {
        "question": "What is the output of `0.1 + 0.2 === 0.3`?",
        "answers": [
          "true",
          "false",
          "undefined",
          "NaN"
        ],
        "correct_answer": "false"
      },
      {
        "question": "Which of the following is not a valid JavaScript data type?",
        "answers": [
          "Number",
          "String",
          "Float",
          "Undefined"
        ],
        "correct_answer": "Float"
      },
      {
        "question": "What will `console.log([] + {})` output?",
        "answers": [
          "[object Object]",
          "[]{}",
          "NaN",
          "Error"
        ],
        "correct_answer": "[object Object]"
      },
      {
        "question": "Which method is used to remove the last element of an array?",
        "answers": [
          "pop()",
          "shift()",
          "splice()",
          "remove()"
        ],
        "correct_answer": "pop()"
      }
    ]
  }
  
  

// Function to push all questions into a single document
async function pushQuizDataToSingleDoc() {
  try {
    const docRef = doc(db, "meduimlevel", "javascript"); // Reference to the 'quizData' document in 'easylevel' collection
    await setDoc(docRef, quizData); // Add the entire JSON object to the document
    console.log("Quiz data added successfully to a single document!");
  } catch (error) {
    console.error("Error adding quiz data: ", error);
  }
}

// Call the function
pushQuizDataToSingleDoc();