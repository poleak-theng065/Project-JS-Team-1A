import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { db } from "./firebase.js"; // Ensure the correct relative path to firebase.js

async function fetchQuizzes() {
  const querySnapshot = await getDocs(collection(db, "quizzes"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
}

const questions = querySnapshot.docs.map(doc => doc.data().question);

console.log(questions)

fetchQuizzes();
