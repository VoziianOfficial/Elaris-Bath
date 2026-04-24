// js/contact.js

document.addEventListener("DOMContentLoaded", () => {
    initContactAnimations();
    initContactForm();
});

function initContactAnimations() {
    if (window.AOS) {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 90
        });
    }
}

function initContactForm() {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const button = form.querySelector("button[type='submit'], .btn-primary");
        const originalText = button.innerHTML;

        button.innerHTML = `Request Sent <i data-lucide="check"></i>`;
        button.disabled = true;

        if (window.lucide) {
            window.lucide.createIcons();
        }

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;

            if (window.lucide) {
                window.lucide.createIcons();
            }

            form.reset();
        }, 2200);
    });
}