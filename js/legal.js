// js/legal.js

document.addEventListener("DOMContentLoaded", () => {
    initLegalAnimations();
});

function initLegalAnimations() {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }
}