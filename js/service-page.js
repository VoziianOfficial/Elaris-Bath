// js/service-page.js

document.addEventListener("DOMContentLoaded", () => {
    initServiceContent();
    initServicePageAnimations();
});

function getCurrentService() {
    if (!window.SERVICES_DATA) return null;

    const serviceSlug = document.documentElement.dataset.service;
    const path = window.location.pathname.split("/").pop();

    return window.SERVICES_DATA.find((item) => {
        return item.slug === serviceSlug || item.page === path;
    });
}

function initServiceContent() {
    const service = getCurrentService();
    if (!service) return;

    document.title = `${service.title} Providers | Elaris Bath`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute(
            "content",
            `Compare local ${service.title.toLowerCase()} providers through Elaris Bath.`
        );
    }

    const setText = (selector, value) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.textContent = value;
        });
    };

    setText("[data-service-title]", service.heroTitle);
    setText("[data-service-intro]", service.intro);
    setText("[data-service-cover]", service.cover || service.heroTitle);
    setText("[data-service-detail]", service.detail || service.intro);
    setText("[data-service-note]", service.title);

    const image = document.querySelector("[data-service-image]");
    if (image) {
        image.src = service.image;
        image.alt = service.alt || service.title;
    }

    const noteIcon = document.querySelector(".service-media-note i");
    if (noteIcon) {
        noteIcon.setAttribute("data-lucide", service.icon);
    }

    const factors = document.querySelector("[data-service-factors]");
    if (factors && Array.isArray(service.factors)) {
        factors.innerHTML = service.factors
            .map((factor, index) => `
                <div>
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <p>${factor}</p>
                </div>
            `)
            .join("");
    }

    const prompts = document.querySelector("[data-service-prompts]");
    if (prompts && Array.isArray(service.prompts)) {
        prompts.innerHTML = service.prompts.map((prompt) => `<span>${prompt}</span>`).join("");
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function initServicePageAnimations() {
    if (window.AOS) {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 90
        });
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".service-hero-media img", {
            scale: 1.08,
            y: 34,
            scrollTrigger: {
                trigger: ".service-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.utils.toArray(".provider-card").forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -14 : 14,
                scrollTrigger: {
                    trigger: ".provider-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
}
