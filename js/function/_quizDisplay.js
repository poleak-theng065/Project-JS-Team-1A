function displayQuize(quizData){
    let quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = ""; // Clear previous content

    for (let i = 0; i < quizData.length; i++) {
        //create a new div for each quiz item
        quizContainer.appendChild(quizItem);
    }
}