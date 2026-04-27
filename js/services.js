// js/services.js

document.addEventListener("DOMContentLoaded", () => {
    initServicesAnimations();
});

function initServicesAnimations() {
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

        gsap.to(".board-image", {
            y: 36,
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".note-one", {
            y: -28,
            x: 12,
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".note-two", {
            y: 24,
            x: -10,
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        /*
            ВАЖНО:
            Не анимируем .atlas-card через y/transform.
            Иначе карточки service-atlas начинают наезжать друг на друга.
        */
    }
}


