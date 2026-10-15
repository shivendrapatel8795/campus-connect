"use strict";

/* ==========================================================
                    SIGNUP PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializePasswordToggle();

    initializeSignupForm();

});

/* ==========================================================
            SHOW / HIDE PASSWORDS
========================================================== */

function initializePasswordToggle() {

    setupPasswordToggle(
        "#password",
        "#togglePassword"
    );

    setupPasswordToggle(
        "#confirmPassword",
        "#toggleConfirmPassword"
    );

}

function setupPasswordToggle(inputSelector, buttonSelector) {

    const input =
        document.querySelector(inputSelector);

    const button =
        document.querySelector(buttonSelector);

    if (!input || !button) return;

    button.addEventListener("click", () => {

        const hidden =
            input.type === "password";

        input.type =
            hidden ? "text" : "password";

        button.innerHTML = hidden
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

    });

}

/* ==========================================================
                    SIGNUP FORM
========================================================== */

function initializeSignupForm() {

    const form =
        document.querySelector("#signupForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const fullName =
            document.querySelector("#fullName").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const role =
            document.querySelector("#role").value;

        const department =
            document.querySelector("#department").value;

        const password =
            document.querySelector("#password").value;

        const confirmPassword =
            document.querySelector("#confirmPassword").value;

        const terms =
            document.querySelector("#terms").checked;

        if (
            !fullName ||
            !email ||
            !phone ||
            !role ||
            !department ||
            !password ||
            !confirmPassword
        ) {

            alert("Please fill in all fields.");

            return;

        }

        if (!isValidEmail(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        if (!isValidPhone(phone)) {

            alert("Please enter a valid 10-digit phone number.");

            return;

        }

        if (password.length < 8) {

            alert("Password must be at least 8 characters long.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        if (!terms) {

            alert("Please accept the Terms & Conditions.");

            return;

        }

        alert("Registration successful! (Frontend Demo)");

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

/* ==========================================================
                PHONE VALIDATION
========================================================== */

function isValidPhone(phone) {

    const pattern =
        /^[6-9]\d{9}$/;

    return pattern.test(phone);

}