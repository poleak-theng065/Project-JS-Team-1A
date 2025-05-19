function displayQuize(quizData) {
  const quizContainer = document.getElementById("quiz-container");

  quizData.forEach((quiz) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300";
    card.innerHTML = `
      <div class="relative overflow-hidden h-48">
      <img
        alt="${quiz.title || "Quiz"}"
        class="w-full h-full object-cover"
        loading="lazy"
        src="${quiz.image || "https://storage.googleapis.com/a1aa/image/3b4bad63-0b7a-4dcf-43d6-c20fa08af0e7.jpg"}"
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
      >
        Start Quiz
      </button>
      </div>
    `;
    quizContainer.appendChild(card);
  });
}

export {displayQuize};
