const defficultyForm = document.querySelectorAll('.card');
const detailsDiv = document.querySelector('.details');
// const formDiv = document.querySelector('.form');

// formDiv.style.display = 'none';

function clickForDetails() {
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}

for (let card of defficultyForm){
    const imageNav = document.querySelectorAll('#image');
    imageNav.addEventListener('click', clickForDetails);
}
    

const buttons = detailsDiv.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        formDiv.style.display = 'block';
        defficultyForm.style.display = 'none';

    });
});

