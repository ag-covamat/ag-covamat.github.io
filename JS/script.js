const CORRECT_PASSWORD = "motdepassesupersecret";

const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const submitPasswordBtn = document.getElementById('submit-password');
const errorMessage = document.getElementById('error-message');
const mainContent = document.getElementById('main-content');
const logoutButton = document.getElementById('logout-button');

function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        showContent();
    } else {
        showPasswordPrompt();
    }
}

function showPasswordPrompt() {
    passwordOverlay.style.display = 'flex';
    mainContent.style.display = 'none';
}

function showContent() {
    passwordOverlay.style.display = 'none';
    mainContent.style.display = 'block';
}

function authenticate() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === CORRECT_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        showContent();
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
    }
    passwordInput.value = '';
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    showPasswordPrompt();
}

// Écouteurs d'événements
submitPasswordBtn.addEventListener('click', authenticate);
passwordInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        authenticate();
    }
});
logoutButton.addEventListener('click', logout);

// Appelle la fonction de vérification au chargement de la page
document.addEventListener('DOMContentLoaded', checkAuthentication);