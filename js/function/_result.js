let quizName,
  quizLevel,
  quizScore,
  quizScoreFill,
  correctAnswer,
  incorrectAnswer,
  quizDuration,
  unanswered,
  backBtn,
  reQuizBtn;

document.addEventListener("DOMContentLoaded", async () => {
  //quiz Result call
  quizName = document.querySelector("#quiz-name");
  quizLevel = document.querySelector("#level");
  correctAnswer = document.querySelector("#correct-answers");
  incorrectAnswer = document.querySelector("#incorrect-answers");
  unanswered = document.querySelector("#unanswered");
  quizDuration = document.querySelector('#quiz-duration')

  quizScore = document.querySelector("#score");
  quizScoreFill = document.querySelector("#scoreFill");
  
  console.log("Script Success!");
  getQuizResult();

  //button
  backBtn = document.querySelector("#backBtn");
  reQuizBtn = document.querySelector("#reQuizBtn");

  backBtn.addEventListener("click", () => {
    removeLocalStorage();
    localStorage.removeItem("quiz-title");
    localStorage.removeItem("quiz-level");
    window.location.href = "../../index.html";
  });

  reQuizBtn.addEventListener("click", () => {
    removeLocalStorage();
    window.location.href = "./quiz.html";
  });
});

function getQuizResult() {
  quizName.textContent = localStorage.getItem("quiz-title");
  quizLevel.textContent = localStorage.getItem("quiz-level");
  correctAnswer.textContent = localStorage.getItem("quiz-correct") || 0;
  incorrectAnswer.textContent = localStorage.getItem("quiz-incorrect") || 0;
  unanswered.textContent = localStorage.getItem("quiz-unanswered") || 0;
  quizScore.textContent = localStorage.getItem("quiz-score") || 0;
  quizScoreFill.style.width = `${localStorage.getItem("quiz-score") || 0}%`;
  quizDuration.textContent = localStorage.getItem("quiz-duration") || 0;
}

function removeLocalStorage() {
  localStorage.removeItem("quiz-correct");
  localStorage.removeItem("quiz-incorrect");
  localStorage.removeItem("quiz-unanswered");
  localStorage.removeItem("quiz-score");
  localStorage.removeItem("quiz-duration")
}
