// In-memory user data
let userData = {};

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    if (username in userData && userData[username] === password) {
        loginMessage.style.color = "green";
        loginMessage.textContent = `Welcome, ${username}!`;
    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password.";
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    if (username in userData) {
        registerMessage.style.color = "red";
        registerMessage.textContent = "Username already exists.";
    } else {
        userData[username] = password;
        registerMessage.style.color = "green";
        registerMessage.textContent = `User ${username} registered successfully!`;
    }
});
