const CORRECT_PASSWORD = "motdepassesupersecret";

// Get references to the DOM elements
const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const submitPasswordBtn = document.getElementById('submit-password');
const errorMessage = document.getElementById('error-message');
const mainContent = document.getElementById('main-content');
const logoutButton = document.getElementById('logout-button');

// Function to check authentication status
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        showContent();
    } else {
        showPasswordPrompt();
    }
}

// Function to display the password prompt
function showPasswordPrompt() {
    passwordOverlay.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Function to display the main content
function showContent() {
    passwordOverlay.style.display = 'none';
    mainContent.style.display = 'block';
}

// Function to handle password authentication
function authenticate() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === CORRECT_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        showContent();
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
    }
    passwordInput.value = ''; // Clear the password field after attempt
}

// Function to handle user logout
function logout() {
    localStorage.removeItem('isAuthenticated');
    showPasswordPrompt();
}

// Event Listeners
submitPasswordBtn.addEventListener('click', authenticate);
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        authenticate();
    }
});
logoutButton.addEventListener('click', logout);

// Check authentication on page load
document.addEventListener('DOMContentLoaded', checkAuthentication);
