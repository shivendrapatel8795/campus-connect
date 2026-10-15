"use strict";

/* ==========================================================
   CAMPUSCONNECT
   Global Application Script
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    console.log("CampusConnect Started");

    await loadComponent("#navbar", "components/navbar.html");

    // await loadComponent("#footer", "components/footer.html");

    initializeApplication();

});


/* ==========================================================
   LOAD HTML COMPONENT
========================================================== */

async function loadComponent(target, file) {

    const container = document.querySelector(target);

    if (!container) {
        console.error(`Container not found : ${target}`);
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Unable to load ${file}`
            );
        }

        const html = await response.text();

        container.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <div style="
                padding:20px;
                color:#EF4444;
                text-align:center;
                font-weight:600;
            ">
                Failed to load component.
            </div>
        `;
    }

}


/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApplication() {

    initializeNavbar();

    setCurrentYear();

    initializeFAQ();

}


/* ==========================================================
   NAVBAR
========================================================== */

function initializeNavbar() {

    const header = document.querySelector("#siteHeader");
    const menu = document.querySelector("#navbarMenu");
    const toggle = document.querySelector("#navbarToggle");

    if (!header) return;

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    function updateNavbar() {

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        }

        else {
            header.classList.remove("scrolled");
        }

    }

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {

        menu.classList.toggle("active");

        toggle.classList.toggle("active");

        const expanded =
            toggle.classList.contains("active");

        toggle.setAttribute(
            "aria-expanded",
            expanded
        );

    });

    document.addEventListener("click", (event) => {

        const clickedInside =
            event.target.closest(".navbar");

        if (clickedInside) return;

        closeMenu();

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    function closeMenu() {

        menu.classList.remove("active");

        toggle.classList.remove("active");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    setActiveLink();

}


/* ==========================================================
   ACTIVE PAGE
========================================================== */

function setActiveLink() {

    const page =
        location.pathname
            .split("/")
            .pop() || "index.html";

    document
        .querySelectorAll(".navbar__link")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (href === page) {

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

}


/* ==========================================================
   FOOTER YEAR
========================================================== */

function setCurrentYear() {

    const year =
        document.querySelector("#currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}

/* ==========================================================
   FAQ ACCORDION
========================================================== */

function initializeFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {

        const button = item.querySelector(".faq-question");

        button.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });

            if (!isActive) {

                item.classList.add("active");

            }

        });

    });

}