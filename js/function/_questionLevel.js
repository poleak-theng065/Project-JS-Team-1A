function quizQuestionLevel(id, level, data){
    let quizId = id;
    let quizLevel = level;
    let quizData =  data;
    let quizQuestion = null;

    for (let i = 0; i < quizData.length; i++) {
        if (quizData[i].id === quizId) {
            quizQuestion = quizData[i][quizLevel];
            break;
        }
    }

    return quizQuestion;
}

// Export the function for use in other modules
export { quizQuestionLevel };