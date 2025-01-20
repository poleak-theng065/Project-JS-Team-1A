const defficultyForm = document.querySelector('#defficulty');
const imageNav = document.getElementById('image');
const detailsDiv = document.querySelector('.details');
const formDiv = document.querySelector('.form');

formDiv.style.display = 'none';

function clickForDetails() {
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}

imageNav.addEventListener('click', clickForDetails);

const buttons = detailsDiv.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        formDiv.style.display = 'block';
        defficultyForm.style.display = 'none';

    });
});

