import { ChooseLevel } from "./_quizLevel.js";

function displayQuiz(quizData) {
  const quizContainer = document.getElementById("quiz-container");
  if (!quizContainer) return;

  quizContainer.innerHTML = ""; // Clear existing cards

  quizData.forEach((quiz) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300";
    card.innerHTML = `
      <div class="relative overflow-hidden h-48">
      <img
        alt="${quiz.title || "Quiz"}"
        class="w-full h-full object-cover"
        loading="lazy"
        src="../../image/quiz/${quiz.image || "default.jpg"}"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>
      <div class="p-5">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-4">
        ${quiz.title || "Mathematics"}
      </h2>
      <p class="text-gray-600 mb-4">
        ${quiz.description || "Test your skills with numbers and equations"}
      </p>
      <button
        class="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-2.5 px-6 rounded-full shadow transition duration-300"
        type="button"
        aria-label="Start ${quiz.title || "Quiz"} Quiz"
        id="${quiz.title}"
      >
        Start Quiz
      </button>
      </div>
    `;

    // Add click event listener to the button
    const button = card.querySelector("button");
    button.addEventListener("click", async () => {
      try {
        const subject = button.id;
        const { quizId, level } = await ChooseLevel(subject);
        localStorage.setItem("quiz-title", quizId);
        localStorage.setItem("quiz-level", level);  
        // console.log(`quiz id : ${quizId} , quiz level: ${level}`)
        window.location.href = "page/quiz/quiz.html";
      } catch (error) {
        // Only show error if it wasn't a user cancellation
        if (error.message !== "User cancelled level selection") {
          console.error("Quiz loading error:", error);
          Swal.fire({
            icon: "error",
            title: "Loading Failed",
            text: "Could not load the quiz. Please try again later.",
          });
        }
      }
    });

    quizContainer.appendChild(card);
  });
}

export { displayQuiz };
