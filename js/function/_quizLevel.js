function ChooseLevel(quizID) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Choose your quiz level :',
      html:
        `<div class="flex flex-col space-y-4 mt-4">
          <button id="hard" class="w-full py-2 rounded text-white font-semibold bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Hard</button>
          <button id="medium" class="w-full py-2 rounded text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300">Medium</button>
          <button id="easy" class="w-full py-2 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Easy</button>
        </div>`,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'p-6 max-w-xs',
        title: 'text-lg font-semibold text-center'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        reject(new Error('User cancelled'));
      }
    });

    const popup = Swal.getPopup();
    popup.querySelector('#hard').addEventListener('click', () => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'You selected: Hard',
        timer: 1500,
        showConfirmButton: false,
      });
      resolve({ quizId: quizID, level: 'hard' });
    });
    
    popup.querySelector('#medium').addEventListener('click', () => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'You selected: Medium',
        timer: 1500,
        showConfirmButton: false,
      });
      resolve({ quizId: quizID, level: 'medium' });
    });
    
    popup.querySelector('#easy').addEventListener('click', () => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'You selected: Easy',
        timer: 1500,
        showConfirmButton: false,
      });
      resolve({ quizId: quizID, level: 'easy' });
    });
  });
}

export { ChooseLevel };

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