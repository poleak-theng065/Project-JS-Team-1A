const imageNav = document.getElementById('image');
const detailsDiv = document.querySelector('.details');

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
        // alert(`${button.textContent} button clicked!`);
    });
});