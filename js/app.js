// Function to toggle visibility of a card's details div
function toggleDetails(card) {
    const detailsDiv = card.querySelector('.details'); // Get the details div inside the card
    if (detailsDiv.style.display === 'block') {
        detailsDiv.style.display = 'none';
    } else {
        detailsDiv.style.display = 'block';
    }
}

// Function to handle click event on buttons inside a card
function handleButtonClick(formDiv, card) {
    const buttons = card.querySelectorAll('.details button'); // Select all buttons in the card
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            formDiv.style.display = 'block'; // Show the form
            card.style.display = 'none'; // Hide the current card (optional)
        });
    });
}

// Function to initialize event listeners for cards
function initializeCards() {
    const cards = document.querySelectorAll('.card'); // Select all cards
    const formDiv = document.querySelector('.form'); // Assuming .form exists

    if (formDiv) {
        formDiv.style.display = 'none'; // Initially hide the form
    }

    cards.forEach(card => {
        const imageNav = card.querySelector('#image'); // Get the image element inside the card
        if (imageNav) {
            imageNav.addEventListener('click', () => toggleDetails(card)); // Add click event to toggle details
        }

        if (formDiv) {
            handleButtonClick(formDiv, card); // Add click events to buttons
        }
    });
}

// Initialize everything when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', initializeCards);
