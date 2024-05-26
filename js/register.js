document.addEventListener('DOMContentLoaded', function() {
    const showPassword1 = document.getElementById('showPassword1');
    const showPassword2 = document.getElementById('showPassword2');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    showPassword1.addEventListener('change', function() {
        if (this.checked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    });

    showPassword2.addEventListener('change', function() {
        if (this.checked) {
            confirmPassword.type = 'text';
        } else {
            confirmPassword.type = 'password';
        }
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        if (!email.validity.valid) {
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.style.display = 'none';
        }

        if (password.value.length < 8) {
            passwordError.style.display = 'block';
            valid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (password.value !== confirmPassword.value) {
            confirmPasswordError.style.display = 'block';
            valid = false;
        } else {
            confirmPasswordError.style.display = 'none';
        }

        if (valid) {
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then(function(userCredential) {
                    const user = userCredential.user;
                    return db.collection('users').doc(user.uid).set({
                        email: user.email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(function() {
                    console.log('User registered and data saved!');
                    // Optionally, redirect or show a success message
                })
                .catch(function(error) {
                    console.error('Error: ', error.message);
                    if (error.code === 'auth/email-already-in-use') {
                        emailError.textContent = 'Email is already in use.';
                        emailError.style.display = 'block';
                    } else {
                        emailError.textContent = 'An error occurred. Please try again.';
                        emailError.style.display = 'block';
                    }
                });
        }
    });
});
