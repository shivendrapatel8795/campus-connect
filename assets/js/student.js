"use strict";

/*=================================================
            STUDENT DASHBOARD
=================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSidebar();

    initializeSearch();

    initializeNotifications();

    initializeStatCounters();

    initializeProgressAnimation();

    initializeScrollReveal();

});

/*=================================================
            MOBILE SIDEBAR
=================================================*/

function initializeSidebar() {

    const sidebar = document.querySelector(".sidebar");

    const toggle = document.querySelector("#sidebarToggle");

    const overlay = document.querySelector("#sidebarOverlay");

    if (!sidebar || !toggle || !overlay) return;

    toggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.toggle("active");

        overlay.classList.toggle("active");

        toggle.setAttribute("aria-expanded", isOpen);
    });

    overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });

    function closeSidebar() {

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

        toggle.setAttribute("aria-expanded", "false");

    }

}

/*=================================================
            SEARCH
=================================================*/

function initializeSearch() {

    const searchInput =
        document.querySelector(".dashboard-search input");

    if (!searchInput) return;

    searchInput.addEventListener("input", (event) => {

        const keyword =
            event.target.value.trim();

        console.log("Search:", keyword);

    });

}

/*=================================================
            NOTIFICATIONS
=================================================*/

function initializeNotifications() {

    const button =
        document.querySelector(".dashboard-icon");

    if (!button) return;

    button.addEventListener("click", () => {

        alert("No new notifications.");

    });

}


/*=========================================
            STAT COUNTERS
=========================================*/

function initializeStatCounters() {

    const stats = document.querySelectorAll(".stat-box h3");

    stats.forEach(stat => {

        const originalText = stat.textContent.trim();

        const number = parseInt(originalText);

        if (isNaN(number)) return;

        const suffix = originalText.replace(number, "");

        let current = 0;

        const duration = 1000;

        const increment = Math.max(1, Math.ceil(number / 40));

        const timer = setInterval(() => {

            current += increment;

            if (current >= number) {

                current = number;

                clearInterval(timer);

            }

            stat.textContent = current + suffix;

        }, duration / 40);

    });

}

/*=========================================
        COURSE PROGRESS ANIMATION
=========================================*/

function initializeProgressAnimation() {

    const bars = document.querySelectorAll(".course-progress__bar span");

    bars.forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0";

        requestAnimationFrame(() => {

            setTimeout(() => {

                bar.style.width = width;

            }, 200);

        });

    });

}


/*=========================================
            SCROLL REVEAL
=========================================*/

function initializeScrollReveal() {

    const elements = document.querySelectorAll(
        ".stat-box, .attendance-widget, .courses-widget, .assignments-widget, .notices-widget, .events-widget"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {

        element.classList.add("hidden");

        observer.observe(element);

    });

}