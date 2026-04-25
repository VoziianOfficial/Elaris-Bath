// js/service-page.js

document.addEventListener("DOMContentLoaded", () => {
    initServiceContent();
    initAnimations();
});

function getCurrentService() {
    if (!window.SERVICES_DATA) return null;
    const serviceKey = document.documentElement.dataset.service;
    const path = window.location.pathname.split("/").pop();
    return window.SERVICES_DATA.find((item) => item.slug === serviceKey || item.page === path) || null;
}

function initServiceContent() {
    const service = getCurrentService();
    if (!service) return;

    document.title = `${service.title} Providers | Elaris Bath`;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", `${service.title}: compare independent local bathroom providers through Elaris Bath. Review scope, quote questions, and provider-fit details before hiring.`);

    const heroTitle = document.querySelector(".service-hero-copy h1");
    const heroText = document.querySelector(".service-hero-copy p");
    const heroImage = document.querySelector(".service-hero-media img");
    const cta = document.querySelector(".service-cta-link");
    const noteIcon = document.querySelector(".service-media-note i");
    const noteText = document.querySelector(".service-media-note span");

    if (heroTitle) heroTitle.textContent = service.heroTitle;
    if (heroText) heroText.textContent = service.intro;
    if (heroImage) {
        heroImage.src = service.image;
        heroImage.alt = `${service.title} bathroom project inspiration`;
    }
    if (cta) cta.innerHTML = `${service.cta || "Request quotes"} <i data-lucide="arrow-up-right"></i>`;
    if (noteIcon) noteIcon.setAttribute("data-lucide", service.icon);
    if (noteText) noteText.textContent = service.title;

    renderServiceSections(service);

    if (window.lucide) window.lucide.createIcons();
}

function renderServiceSections(service) {
    const target = document.querySelector("[data-service-content]");
    if (!target) return;

    const factors = (service.factors || []).map((item, index) => `
        <div class="factor-chip">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${item}</p>
        </div>
    `).join("");

    const prompts = (service.prompts || []).map((item) => `
        <span><i data-lucide="check"></i>${item}</span>
    `).join("");

    const compareItems = (service.compare || []).map((item) => `
        <li><i data-lucide="circle-check"></i><span>${item}</span></li>
    `).join("");

    target.innerHTML = `
        <section class="section service-overview-section">
            <div class="container service-overview-grid">
                <div class="service-copy-block" data-aos="fade-up">
                    <span class="section-eyebrow">Project scope</span>
                    <h2 class="section-title">${service.overviewTitle}</h2>
                    ${(service.overview || []).map((text) => `<p>${text}</p>`).join("")}
                </div>
                <div class="service-side-photo" data-aos="fade-left">
                    <img src="${service.secondaryImage}" alt="${service.title} details and bathroom finishes">
                    <div class="photo-caption"><i data-lucide="scan-search"></i><span>Compare scope, materials, timing, and provider fit.</span></div>
                </div>
            </div>
        </section>

        <section class="section service-detail-band">
            <div class="container-wide service-detail-panel">
                <div class="detail-intro" data-aos="fade-right">
                    <span class="section-eyebrow">Comparison details</span>
                    <h2>${service.detailTitle || "What should be reviewed before choosing?"}</h2>
                    <p>${service.detailText || "Use these points as a clearer starting framework when speaking with independent local providers. The goal is not the fastest answer, but the clearest quote."}</p>
                </div>
                <div class="service-factor-grid" data-aos="fade-left">${factors}</div>
            </div>
        </section>

        <section class="section service-compare-section">
            <div class="container service-compare-grid">
                <div class="compare-mini-card" data-aos="fade-up">
                    <i data-lucide="search-check"></i>
                    <h3>Use the platform as a starting point.</h3>
                    <p>Elaris Bath helps organize your request and connect it with independent local providers. It does not complete, supervise, or guarantee bathroom work.</p>
                    <p>Think of the platform as an intake and comparison layer: you describe the scope, then providers can clarify what is included, what is excluded, and what changes the price.</p>
                    <p>For any service category, the final decision should be based on written scope, credential checks, timeline clarity, and a quote that matches the same assumptions.</p>
                </div>
                <div class="compare-checklist" data-aos="fade-up" data-aos-delay="90">
                    <span class="section-eyebrow">Before you choose</span>
                    <ul>${compareItems}</ul>
                    <p class="section-text">
                        Compare providers using the same questions, then confirm license, insurance, service area, and
                        warranty terms directly before you hire.
                    </p>
                    <p class="section-text">
                        Ask each provider to quote the same assumptions (materials, removal, waterproofing, cleanup,
                        and timeline) so you can compare scope instead of comparing mismatched totals.
                    </p>
                    <p class="section-text">
                        Elaris Bath is an independent matching platform. Providers are third parties, and homeowners
                        should verify credentials and written quote details directly.
                    </p>
                </div>
            </div>
        </section>

        <section class="section provider-section compact-provider-section">
            <div class="container">
                <div class="section-head split-head compact-head">
                    <div>
                        <span class="section-eyebrow">Provider fit</span>
                        <h2 class="section-title">Ask better questions before hiring.</h2>
                    </div>
                    <p class="section-text">Homeowners should verify licenses, insurance, written quote details, warranty terms, and service-area availability directly with any provider they consider hiring.</p>
                </div>
                <div class="provider-grid three-card-grid">
                    <article class="provider-card" data-aos="fade-up"><i data-lucide="badge-check"></i><h3>Credentials</h3><p>Ask what license, insurance, permits, or local requirements apply to the work being discussed.</p></article>
                    <article class="provider-card" data-aos="fade-up" data-aos-delay="80"><i data-lucide="file-text"></i><h3>Written scope</h3><p>Compare labor, materials, exclusions, timeline, payment terms, and how changes are handled.</p></article>
                    <article class="provider-card" data-aos="fade-up" data-aos-delay="160"><i data-lucide="calendar-clock"></i><h3>Scheduling</h3><p>Confirm timing, expected disruption, provider availability, communication rhythm, and cleanup expectations.</p></article>
                </div>
            </div>
        </section>

        <section class="section quote-prompts-section">
            <div class="container">
                <div class="quote-prompts-card" data-aos="zoom-in">
                    <span class="section-eyebrow">Quote prompts</span>
                    <h2>Questions to keep the conversation clear.</h2>
                    <div class="quote-prompts-grid premium-prompt-grid">${prompts}</div>
                    <a class="btn btn-primary" href="contact.html">Compare providers <i data-lucide="send"></i></a>
                </div>
            </div>
        </section>
    `;
}

function initAnimations() {
    if (window.AOS) {
        AOS.init({ duration: 720, easing: "ease-out-cubic", once: true, offset: 64 });
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".service-hero-media img", {
            scale: 1.04,
            y: 16,
            scrollTrigger: { trigger: ".service-hero", start: "top top", end: "bottom top", scrub: true }
        });
    }
}
