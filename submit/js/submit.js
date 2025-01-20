// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.querySelector("button:nth-of-type(2)");
    const questions = document.querySelectorAll(".Question-quiz, .writing-question");
  
    submitButton.addEventListener("click", () => {
      let correctAnswers = 0;
  
      // Question 1: JavaScript comment syntax
      const question1 = questions[0];
      const question1Answers = question1.querySelectorAll("input[type='checkbox']");
      const correctChoices1 = [true, true, false, false]; // Correct answers: // and /*
      let isCorrect1 = true;
      question1Answers.forEach((checkbox, index) => {
        if (checkbox.checked !== correctChoices1[index]) {
          isCorrect1 = false;
        }
      });
      question1.style.backgroundColor = isCorrect1 ? "lightgreen" : "lightcoral";
      if (isCorrect1) correctAnswers++;
      else {
        const answer1 = document.createElement("p");
        answer1.textContent = "Correct answers: //, /*";
        answer1.style.color = "blue";
        question1.appendChild(answer1);
      }
  
      // Question 2: Styling languages
      const question2 = questions[1];
      const question2Answers = question2.querySelectorAll("input[type='checkbox']");
      const correctChoices2 = [false, false, false, true]; // Correct answer: CSS
      let isCorrect2 = true;
      question2Answers.forEach((checkbox, index) => {
        if (checkbox.checked !== correctChoices2[index]) {
          isCorrect2 = false;
        }
      });
      question2.style.backgroundColor = isCorrect2 ? "lightgreen" : "lightcoral";
      if (isCorrect2) correctAnswers++;
      else {
        const answer2 = document.createElement("p");
        answer2.textContent = "Correct answer: CSS";
        answer2.style.color = "blue";
        question2.appendChild(answer2);
      }
  
      // Question 3: What is HTML?
      const question3 = questions[2];
      const question3Input = question3.querySelector("input[type='text']");
      const correctAnswer3 = "HyperText Markup Language";
      const isCorrect3 = question3Input.value.trim().toLowerCase() === correctAnswer3.toLowerCase();
      question3.style.backgroundColor = isCorrect3 ? "lightgreen" : "lightcoral";
      if (isCorrect3) correctAnswers++;
      else {
        const answer3 = document.createElement("p");
        answer3.textContent = `Correct answer: ${correctAnswer3}`;
        answer3.style.color = "blue";
        question3.appendChild(answer3);
      }
  
      // Question 4: What is DOM?
      const question4 = questions[3];
      const question4Input = question4.querySelector("input[type='text']");
      const correctAnswer4 = "Document Object Model";
      const isCorrect4 = question4Input.value.trim().toLowerCase() === correctAnswer4.toLowerCase();
      question4.style.backgroundColor = isCorrect4 ? "lightgreen" : "lightcoral";
      if (isCorrect4) correctAnswers++;
      else {
        const answer4 = document.createElement("p");
        answer4.textContent = `Correct answer: ${correctAnswer4}`;
        answer4.style.color = "blue";
        question4.appendChild(answer4);
      }
  
      // Display results
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<h2>You got ${correctAnswers} out of 4 questions correct!</h2>`;
      resultDiv.style.color = correctAnswers === 4 ? "green" : "red";
    });
  });
  