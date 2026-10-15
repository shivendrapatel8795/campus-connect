"use strict";

/* ==========================================================
                    LOGIN PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePasswordToggle();

    initializeLoginForm();

});

/* ==========================================================
                SHOW / HIDE PASSWORD
========================================================== */

function initializePasswordToggle() {

    const passwordInput =
        document.querySelector("#password");

    const toggleButton =
        document.querySelector("#togglePassword");

    if (!passwordInput || !toggleButton) return;

    toggleButton.addEventListener("click", () => {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword ? "text" : "password";

        toggleButton.innerHTML = isPassword
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

    });

}

/* ==========================================================
                    LOGIN FORM
========================================================== */

function initializeLoginForm() {

    const form =
        document.querySelector("#loginForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const role =
            document.querySelector("#role").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const password =
            document.querySelector("#password").value.trim();

        if (!role || !email || !password) {

            alert("Please fill in all fields.");

            return;

        }

        if (!isValidEmail(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Login successful! (Frontend Demo)");

        form.reset();

    });

}

/* ==========================================================
                    EMAIL VALIDATION
========================================================== */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}