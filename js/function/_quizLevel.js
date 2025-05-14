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
        reject(new Error('User cancelled level selection'));
      }
    });

    const popup = Swal.getPopup();
    if (!popup) {
      reject(new Error('Popup not found'));
      return;
    }

    const hardBtn = popup.querySelector('#hard');
    const mediumBtn = popup.querySelector('#medium');
    const easyBtn = popup.querySelector('#easy');

    if (!hardBtn || !mediumBtn || !easyBtn) {
      reject(new Error('Level buttons not found'));
      return;
    }

    hardBtn.addEventListener('click', () => handleLevelSelection(quizID, 'hard', resolve));
    mediumBtn.addEventListener('click', () => handleLevelSelection(quizID, 'medium', resolve));
    easyBtn.addEventListener('click', () => handleLevelSelection(quizID, 'easy', resolve));
  });
}

function handleLevelSelection(quizID, level, resolve) {
  Swal.close();
  Swal.fire({
    icon: 'success',
    title: `You selected: ${level.charAt(0).toUpperCase() + level.slice(1)}`,
    timer: 1500,
    showConfirmButton: false,
  });
  resolve({ quizId: quizID, level: level });
}

export { ChooseLevel };