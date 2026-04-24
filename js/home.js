// js/home.js

document.addEventListener("DOMContentLoaded", () => {
    initHomeAnimations();
    initBathStyleSwiper();
    initCounters();
});

function initHomeAnimations() {
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

        gsap.to(".hero-image-main", {
            y: 34,
            scrollTrigger: {
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".hero-image-small", {
            y: -42,
            scrollTrigger: {
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".hero-floating-card", {
            y: -24,
            rotate: -1.5,
            scrollTrigger: {
                trigger: ".home-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }
}

function initBathStyleSwiper() {
    if (!window.Swiper) return;

    new Swiper(".bath-style-swiper", {
        slidesPerView: 1.08,
        spaceBetween: 16,
        grabCursor: true,
        speed: 700,
        pagination: {
            el: ".bath-style-swiper .swiper-pagination",
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 1.35,
                spaceBetween: 18
            },
            900: {
                slidesPerView: 2.15,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 2.65,
                spaceBetween: 22
            }
        }
    });
}

function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = Number(el.dataset.counter);

                if (Number.isNaN(target)) return;

                let current = 0;
                const duration = 900;
                const stepTime = 24;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                        return;
                    }

                    el.textContent = Math.round(current);
                }, stepTime);

                obs.unobserve(el);
            });
        },
        {
            threshold: 0.45
        }
    );

    counters.forEach((counter) => observer.observe(counter));
}