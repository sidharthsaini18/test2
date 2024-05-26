document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');
    const spinner = document.getElementById('spinner');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show spinner
        spinner.style.display = 'inline-block';
        
        const userEmail = email.value;
        const userPassword = password.value;

        auth.signInWithEmailAndPassword(userEmail, userPassword)
            .then(function(userCredential) {
                // User successfully logged in
                window.location.href="../html/upload.html"
                // Optionally, redirect to another page
            })
            .catch(function(error) {
                // Handle login errors
                console.error('Login error:', error.message);
                loginError.textContent = error.message;
                loginError.style.display = 'block';
            })
            .finally(function() {
                // Hide spinner and enable login button
                spinner.style.display = 'none';
                loginBtn.disabled = false;
            });
    });
});
