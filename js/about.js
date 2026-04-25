// js/about.js

document.addEventListener("DOMContentLoaded", () => {
    removeAboutStoryImageForSmallScreens();
    initAboutAnimations();
});

function removeAboutStoryImageForSmallScreens() {
    const storyImage = document.querySelector(".about-story-image");
    if (!storyImage || !window.matchMedia) return;

    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    if (!isMobileOrTablet) return;

    storyImage.remove();
}

function initAboutAnimations() {
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

        gsap.to(".about-portrait img", {
            scale: 1.08,
            scrollTrigger: {
                trigger: ".about-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".about-story-image", {
            y: -28,
            scrollTrigger: {
                trigger: ".about-story",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.utils.toArray(".verify-list div").forEach((item, index) => {
            gsap.to(item, {
                x: index % 2 === 0 ? 18 : -18,
                scrollTrigger: {
                    trigger: ".verify-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
}
