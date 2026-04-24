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

    if (window.gsap) {
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

        gsap.utils.toArray(".atlas-card").forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -18 : 18,
                scrollTrigger: {
                    trigger: ".service-atlas",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
}