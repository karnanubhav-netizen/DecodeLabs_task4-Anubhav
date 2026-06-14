/* =========================================================
   STUDENT INTERNSHIP REGISTRATION PORTAL - JAVASCRIPT
   Demonstrates: Form validation, DOM manipulation,
   event handling, accessibility, localStorage
========================================================= */

/* ===================== ELEMENT REFERENCES ===================== */
const form = document.getElementById('registrationForm');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const collegeInput = document.getElementById('college');
const domainSelect = document.getElementById('domain');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');

const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

const strengthSegments = document.querySelectorAll('.strength-segment');
const strengthText = document.getElementById('passwordStrengthText');

const submitBtn = document.getElementById('submitBtn');

const formCard = document.getElementById('formCard');
const summaryCard = document.getElementById('summaryCard');
const summaryDetails = document.getElementById('summaryDetails');
const newApplicationBtn = document.getElementById('newApplicationBtn');

const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');


/* =========================================================
   VALIDATION RULES & ERROR MESSAGES
========================================================= */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

// Password rule patterns
const HAS_UPPER = /[A-Z]/;
const HAS_LOWER = /[a-z]/;
const HAS_NUMBER = /[0-9]/;
const HAS_SPECIAL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


/* =========================================================
   HELPER FUNCTIONS: SHOW / CLEAR ERRORS
========================================================= */

// Display an error message and mark field as invalid
function showError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.remove('valid');
  inputEl.setAttribute('aria-invalid', 'true');
}

// Clear error message and mark field as valid
function clearError(inputEl, errorEl) {
  errorEl.textContent = '';
  inputEl.classList.add('valid');
  inputEl.setAttribute('aria-invalid', 'false');
}

// Reset a field to its neutral (untouched) state
function resetFieldState(inputEl, errorEl) {
  errorEl.textContent = '';
  inputEl.classList.remove('valid');
  inputEl.removeAttribute('aria-invalid');
}


/* =========================================================
   INDIVIDUAL FIELD VALIDATORS
   Each returns true if valid, false if invalid
========================================================= */

function validateFirstName() {
  const value = firstNameInput.value.trim();
  const errorEl = document.getElementById('firstNameError');

  if (value === '') {
    showError(firstNameInput, errorEl, 'First name is required.');
    return false;
  }
  if (value.length < 3) {
    showError(firstNameInput, errorEl, 'First name must be at least 3 characters.');
    return false;
  }
  clearError(firstNameInput, errorEl);
  return true;
}

function validateLastName() {
  const value = lastNameInput.value.trim();
  const errorEl = document.getElementById('lastNameError');

  if (value === '') {
    showError(lastNameInput, errorEl, 'Last name is required.');
    return false;
  }
  if (value.length < 3) {
    showError(lastNameInput, errorEl, 'Last name must be at least 3 characters.');
    return false;
  }
  clearError(lastNameInput, errorEl);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const errorEl = document.getElementById('emailError');

  if (value === '') {
    showError(emailInput, errorEl, 'Email address is required.');
    return false;
  }
  if (!EMAIL_REGEX.test(value)) {
    showError(emailInput, errorEl, 'Please enter a valid email address.');
    return false;
  }
  clearError(emailInput, errorEl);
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const errorEl = document.getElementById('phoneError');

  if (value === '') {
    showError(phoneInput, errorEl, 'Phone number is required.');
    return false;
  }
  if (!PHONE_REGEX.test(value)) {
    showError(phoneInput, errorEl, 'Phone number must be exactly 10 digits.');
    return false;
  }
  clearError(phoneInput, errorEl);
  return true;
}

function validateCollege() {
  const value = collegeInput.value.trim();
  const errorEl = document.getElementById('collegeError');

  if (value === '') {
    showError(collegeInput, errorEl, 'College name is required.');
    return false;
  }
  if (value.length < 3) {
    showError(collegeInput, errorEl, 'College name must be at least 3 characters.');
    return false;
  }
  clearError(collegeInput, errorEl);
  return true;
}

function validateDomain() {
  const value = domainSelect.value;
  const errorEl = document.getElementById('domainError');

  if (value === '') {
    showError(domainSelect, errorEl, 'Please select an internship domain.');
    return false;
  }
  clearError(domainSelect, errorEl);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  const errorEl = document.getElementById('passwordError');

  if (value === '') {
    showError(passwordInput, errorEl, 'Password is required.');
    return false;
  }
  if (value.length < 8) {
    showError(passwordInput, errorEl, 'Password must be at least 8 characters.');
    return false;
  }
  if (!HAS_UPPER.test(value)) {
    showError(passwordInput, errorEl, 'Password must include at least 1 uppercase letter.');
    return false;
  }
  if (!HAS_LOWER.test(value)) {
    showError(passwordInput, errorEl, 'Password must include at least 1 lowercase letter.');
    return false;
  }
  if (!HAS_NUMBER.test(value)) {
    showError(passwordInput, errorEl, 'Password must include at least 1 number.');
    return false;
  }
  if (!HAS_SPECIAL.test(value)) {
    showError(passwordInput, errorEl, 'Password must include at least 1 special character.');
    return false;
  }
  clearError(passwordInput, errorEl);
  return true;
}

function validateConfirmPassword() {
  const value = confirmPasswordInput.value;
  const errorEl = document.getElementById('confirmPasswordError');

  if (value === '') {
    showError(confirmPasswordInput, errorEl, 'Please confirm your password.');
    return false;
  }
  if (value !== passwordInput.value) {
    showError(confirmPasswordInput, errorEl, 'Passwords do not match.');
    return false;
  }
  clearError(confirmPasswordInput, errorEl);
  return true;
}

function validateTerms() {
  const errorEl = document.getElementById('termsError');

  if (!termsCheckbox.checked) {
    errorEl.textContent = 'You must agree to the Terms & Conditions.';
    termsCheckbox.setAttribute('aria-invalid', 'true');
    return false;
  }
  errorEl.textContent = '';
  termsCheckbox.setAttribute('aria-invalid', 'false');
  return true;
}


/* =========================================================
   PASSWORD STRENGTH METER
========================================================= */
function calculatePasswordStrength(value) {
  let score = 0;

  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (HAS_UPPER.test(value) && HAS_LOWER.test(value)) score++;
  if (HAS_NUMBER.test(value)) score++;
  if (HAS_SPECIAL.test(value)) score++;

  // Score ranges 0-5; map to 4 levels
  if (value === '') return { level: 0, label: '—' };
  if (score <= 1) return { level: 1, label: 'Weak' };
  if (score === 2 || score === 3) return { level: 2, label: 'Medium' };
  if (score === 4) return { level: 3, label: 'Strong' };
  return { level: 4, label: 'Very Strong' };
}

function updateStrengthMeter() {
  const value = passwordInput.value;
  const { level, label } = calculatePasswordStrength(value);

  const classes = ['weak', 'medium', 'strong', 'very-strong'];

  // Reset all segments and text classes
  strengthSegments.forEach((seg, index) => {
    classes.forEach(cls => seg.classList.remove(cls));
    if (index < level) {
      seg.classList.add(classes[level - 1]);
    }
  });

  classes.forEach(cls => strengthText.classList.remove(cls));
  if (level > 0) {
    strengthText.classList.add(classes[level - 1]);
  }

  strengthText.textContent = `Password strength: ${label}`;
}


/* =========================================================
   SHOW / HIDE PASSWORD TOGGLE
========================================================= */
function setupPasswordToggle(toggleBtn, inputEl) {
  toggleBtn.addEventListener('click', () => {
    const isHidden = inputEl.type === 'password';
    inputEl.type = isHidden ? 'text' : 'password';
    toggleBtn.textContent = isHidden ? '🙈' : '👁️';
    toggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    toggleBtn.setAttribute('aria-pressed', isHidden ? 'true' : 'false');
  });
}

setupPasswordToggle(togglePasswordBtn, passwordInput);
setupPasswordToggle(toggleConfirmPasswordBtn, confirmPasswordInput);


/* =========================================================
   REAL-TIME VALIDATION EVENT LISTENERS
   Using: input, blur, focus, change events
========================================================= */

// First Name
firstNameInput.addEventListener('input', validateFirstName);
firstNameInput.addEventListener('blur', validateFirstName);

// Last Name
lastNameInput.addEventListener('input', validateLastName);
lastNameInput.addEventListener('blur', validateLastName);

// Email
emailInput.addEventListener('input', validateEmail);
emailInput.addEventListener('blur', validateEmail);

// Phone — restrict to digits only while typing
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  validatePhone();
});
phoneInput.addEventListener('blur', validatePhone);

// College
collegeInput.addEventListener('input', validateCollege);
collegeInput.addEventListener('blur', validateCollege);

// Domain (select uses 'change' event)
domainSelect.addEventListener('change', validateDomain);
domainSelect.addEventListener('blur', validateDomain);

// Password — update strength meter + validate + re-check confirm match
passwordInput.addEventListener('input', () => {
  updateStrengthMeter();
  validatePassword();
  // If confirm password already has a value, re-validate match live
  if (confirmPasswordInput.value !== '') {
    validateConfirmPassword();
  }
});
passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('focus', updateStrengthMeter);

// Confirm Password
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Terms checkbox
termsCheckbox.addEventListener('change', validateTerms);


/* =========================================================
   FORM SUBMISSION
========================================================= */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Run all validators
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isCollegeValid = validateCollege();
  const isDomainValid = validateDomain();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isTermsValid = validateTerms();

  const allValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isCollegeValid &&
    isDomainValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isTermsValid;

  if (!allValid) {
    // Focus the first invalid field for accessibility
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  // ---- All valid: build summary, then show modal (after repaint), then reset form ----
  buildSummaryCard();
  requestAnimationFrame(() => {
    showSuccessModal();
    resetFormCompletely();
  });
});


/* =========================================================
   APPLICATION SUMMARY CARD (dynamically generated)
========================================================= */
function buildSummaryCard() {
  // Clear any previous summary content
  summaryDetails.innerHTML = '';

  const fullName = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`;

  const summaryData = [
    { label: 'Full Name', value: fullName },
    { label: 'Email Address', value: emailInput.value.trim() },
    { label: 'Phone Number', value: phoneInput.value.trim() },
    { label: 'College Name', value: collegeInput.value.trim() },
    { label: 'Internship Domain', value: domainSelect.value }
  ];

  summaryData.forEach(item => {
    // Create wrapper div
    const wrapper = document.createElement('div');

    // Create term (label)
    const dt = document.createElement('dt');
    dt.textContent = item.label;

    // Create description (value)
    const dd = document.createElement('dd');
    dd.textContent = item.value;

    wrapper.appendChild(dt);
    wrapper.appendChild(dd);
    summaryDetails.appendChild(wrapper);
  });

  // Show summary card, hide form card
  formCard.hidden = true;
  summaryCard.hidden = false;
}

// "Submit Another Application" button — return to empty form
newApplicationBtn.addEventListener('click', () => {
  summaryCard.hidden = true;
  formCard.hidden = false;
  firstNameInput.focus();
});


/* =========================================================
   SUCCESS MODAL POPUP
========================================================= */
function showSuccessModal() {
  modalOverlay.hidden = false;
  closeModalBtn.focus();
}

function hideSuccessModal() {
  modalOverlay.hidden = true;
}

closeModalBtn.addEventListener('click', hideSuccessModal);

// Close modal when clicking outside the box
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    hideSuccessModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) {
    hideSuccessModal();
  }
});


/* =========================================================
   FORM RESET AFTER SUCCESSFUL SUBMISSION
========================================================= */
function resetFormCompletely() {
  form.reset();

  // Remove validation classes/attributes from all fields
  const allInputs = form.querySelectorAll('input, select');
  allInputs.forEach(input => {
    const errorEl = document.getElementById(input.id + 'Error');
    if (errorEl) {
      resetFieldState(input, errorEl);
    } else {
      input.classList.remove('valid');
      input.removeAttribute('aria-invalid');
    }
  });

  // Reset password strength meter
  const classes = ['weak', 'medium', 'strong', 'very-strong'];
  strengthSegments.forEach(seg => classes.forEach(cls => seg.classList.remove(cls)));
  classes.forEach(cls => strengthText.classList.remove(cls));
  strengthText.textContent = 'Password strength: —';

  // Reset password visibility toggles back to hidden
  passwordInput.type = 'password';
  confirmPasswordInput.type = 'password';
  togglePasswordBtn.textContent = '👁️';
  confirmPasswordInput.type = 'password';
  toggleConfirmPasswordBtn.textContent = '👁️';
}


/* =========================================================
   DARK MODE TOGGLE (with localStorage persistence)
========================================================= */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.querySelector('.theme-text').textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.querySelector('.theme-text').textContent = 'Dark Mode';
  }
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('portalTheme') || 'light';
applyTheme(savedTheme);

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-theme');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('portalTheme', newTheme);
});