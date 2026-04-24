// js/service-page.js

document.addEventListener("DOMContentLoaded", () => {
    initServiceContent();
    initAnimations();
});

function initServiceContent() {
    if (!window.SERVICES_DATA) return;

    const path = window.location.pathname.split("/").pop();

    const service = window.SERVICES_DATA.find(
        (item) => item.page === path
    );

    if (!service) return;

    // ===== TITLE =====
    document.title = `${service.title} Providers | Elaris Bath`;

    // ===== HERO =====
    const heroTitle = document.querySelector(".service-hero-copy h1");
    const heroText = document.querySelector(".service-hero-copy p");
    const heroImage = document.querySelector(".service-hero-media img");

    if (heroTitle) heroTitle.textContent = service.heroTitle;
    if (heroText) heroText.textContent = service.intro;
    if (heroImage) heroImage.src = service.image;

    // ===== EYEBROW (иконка + текст) =====
    const noteIcon = document.querySelector(".service-media-note i");
    const noteText = document.querySelector(".service-media-note span");

    if (noteIcon) {
        noteIcon.setAttribute("data-lucide", service.icon);
    }

    if (noteText) {
        noteText.textContent = service.title;
    }

    // перерисовать иконки
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function initAnimations() {
    if (window.AOS) {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 90
        });
    }

    if (window.gsap) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".service-hero-media img", {
            scale: 1.08,
            y: 40,
            scrollTrigger: {
                trigger: ".service-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }
}