// ==================== Authentication Utilities ====================
// Simple form validation and login/register handling

// Toggle password visibility
function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    if (toggleRegPassword) {
        toggleRegPassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('regPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleRegPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('confirmPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthElement = document.getElementById('passwordStrength');
    
    if (!strengthElement) return;

    // Remove previous classes
    strengthElement.className = 'password-strength';

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (password.length === 0) {
        strengthElement.textContent = '';
    } else if (strength < 2) {
        strengthElement.textContent = '❌ Weak password';
        strengthElement.classList.add('weak');
    } else if (strength < 3) {
        strengthElement.textContent = '⚠️ Fair password';
        strengthElement.classList.add('fair');
    } else if (strength < 4) {
        strengthElement.textContent = '✓ Good password';
        strengthElement.classList.add('good');
    } else {
        strengthElement.textContent = '✓ Strong password';
        strengthElement.classList.add('strong');
    }
}

// Login form handler
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        let isValid = true;

        // Email validation
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Password validation
        if (!password) {
            document.getElementById('passwordError').textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (isValid) {
            // Save user data to localStorage (for demo purposes)
            const userData = {
                email: email,
                rememberMe: document.getElementById('remember').checked,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Login successful! Redirecting...';
            successMessage.classList.add('show');

            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    });
}

// Register form handler
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    // Setup password strength checker
    const regPassword = document.getElementById('regPassword');
    if (regPassword) {
        regPassword.addEventListener('input', () => {
            checkPasswordStrength(regPassword.value);
        });
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
        });

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsChecked = document.getElementById('terms').checked;

        let isValid = true;

        // First name validation
        if (!firstName) {
            document.getElementById('firstNameError').textContent = 'First name is required';
            isValid = false;
        } else if (firstName.length < 2) {
            document.getElementById('firstNameError').textContent = 'First name must be at least 2 characters';
            isValid = false;
        }

        // Last name validation
        if (!lastName) {
            document.getElementById('lastNameError').textContent = 'Last name is required';
            isValid = false;
        } else if (lastName.length < 2) {
            document.getElementById('lastNameError').textContent = 'Last name must be at least 2 characters';
            isValid = false;
        }

        // Email validation
        if (!email) {
            document.getElementById('regEmailError').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('regEmailError').textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Username validation
        if (!username) {
            document.getElementById('usernameError').textContent = 'Username is required';
            isValid = false;
        } else if (username.length < 3) {
            document.getElementById('usernameError').textContent = 'Username must be at least 3 characters';
            isValid = false;
        }

        // Password validation
        if (!password) {
            document.getElementById('regPasswordError').textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            document.getElementById('regPasswordError').textContent = 'Password must be at least 8 characters';
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            isValid = false;
        }

        // Terms validation
        if (!termsChecked) {
            document.getElementById('termsError').textContent = 'You must agree to the terms';
            isValid = false;
        }

        if (isValid) {
            // Save user data to localStorage (for demo purposes)
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                registrationTime: new Date().toISOString()
            };

            // In a real app, you'd send this to a server
            localStorage.setItem('userProfile', JSON.stringify(newUser));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Account created successfully! Redirecting to dashboard...';
            successMessage.classList.add('show');

            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    });
}

// Initialize auth functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupPasswordToggle();
    setupLoginForm();
    setupRegisterForm();
});