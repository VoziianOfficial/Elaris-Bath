// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.error("SITE_CONFIG is missing. Check js/config.js connection.");
        return;
    }

    initConfigData(config);
    initMobileMenu();
    initServicesDropdown(config);
    initCookieConsent(config);
    initCurrentYear();
    initLucideIcons();
    initPremiumForms();
});

function initConfigData(config) {
    document.querySelectorAll("[data-company-name]").forEach((el) => {
        el.textContent = config.companyName;
    });

    document.querySelectorAll("[data-company-tagline]").forEach((el) => {
        el.textContent = config.companyTagline;
    });

    document.querySelectorAll("[data-company-id]").forEach((el) => {
        el.textContent = config.companyId;
    });

    document.querySelectorAll("[data-company-address]").forEach((el) => {
        el.textContent = config.address;
    });

    document.querySelectorAll("[data-company-email]").forEach((el) => {
        el.textContent = config.email;
        el.href = `mailto:${config.email}`;
    });

    document.querySelectorAll("[data-company-phone]").forEach((el) => {
        el.textContent = config.phoneButtonText || config.phone;
        el.href = `tel:${config.phoneHref}`;
    });

    document.querySelectorAll("[data-company-phone-number]").forEach((el) => {
        el.textContent = config.phone;
        el.href = `tel:${config.phoneHref}`;
    });

    document.querySelectorAll("[data-footer-text]").forEach((el) => {
        el.textContent = config.footerText;
    });

    document.querySelectorAll("[data-disclaimer]").forEach((el) => {
        el.textContent = config.disclaimer;
    });
}

function initMobileMenu() {
    const toggle = document.querySelector(".mobile-menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const close = document.querySelector(".mobile-menu-close");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const links = document.querySelectorAll(".mobile-menu a");

    if (!toggle || !menu) return;

    const openMenu = () => {
        menu.classList.add("is-open");
        overlay?.classList.add("is-visible");
        toggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        menu.classList.remove("is-open");
        overlay?.classList.remove("is-visible");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", openMenu);
    close?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (!link.closest(".mobile-services-panel")) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

function initServicesDropdown(config) {
    const desktopDropdown = document.querySelector("[data-services-dropdown]");
    const mobileList = document.querySelector("[data-mobile-services-list]");

    if (desktopDropdown && Array.isArray(config.services)) {
        desktopDropdown.innerHTML = config.services
            .map(
                (service) => `
                <a href="${service.href}" class="services-dropdown-link">
                    <span>${service.title}</span>
                    <small>${service.description}</small>
                </a>
            `
            )
            .join("");
    }

    if (mobileList && Array.isArray(config.services)) {
        mobileList.innerHTML = config.services
            .map(
                (service) => `
                <a href="${service.href}" class="mobile-service-link">
                    <span>${service.title}</span>
                    <small>${service.description}</small>
                </a>
            `
            )
            .join("");
    }

    const mobileServicesToggle = document.querySelector(".mobile-services-toggle");
    const mobileServicesPanel = document.querySelector(".mobile-services-panel");

    if (mobileServicesToggle && mobileServicesPanel) {
        mobileServicesToggle.addEventListener("click", () => {
            const isOpen = mobileServicesPanel.classList.toggle("is-open");
            mobileServicesToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
}

function initCookieConsent(config) {
    const consent = document.querySelector(".cookie-consent");
    if (!consent || !config.cookieConsent) return;

    const storageKey = config.cookieConsent.storageKey;
    const savedValue = localStorage.getItem(storageKey);

    if (savedValue) {
        consent.classList.add("is-hidden");
        return;
    }

    consent.classList.remove("is-hidden");

    const title = consent.querySelector("[data-cookie-title]");
    const text = consent.querySelector("[data-cookie-text]");
    const acceptBtn = consent.querySelector("[data-cookie-accept]");
    const declineBtn = consent.querySelector("[data-cookie-decline]");

    if (title) title.textContent = config.cookieConsent.title;
    if (text) text.textContent = config.cookieConsent.text;
    if (acceptBtn) acceptBtn.textContent = config.cookieConsent.acceptText;
    if (declineBtn) declineBtn.textContent = config.cookieConsent.declineText;

    const saveChoice = (value) => {
        localStorage.setItem(storageKey, value);
        consent.classList.add("is-hidden");
    };

    acceptBtn?.addEventListener("click", () => saveChoice("accepted"));
    declineBtn?.addEventListener("click", () => saveChoice("declined"));
}

function initCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });
}

function initLucideIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
function initPremiumForms() {
    const forms = document.querySelectorAll("form");
    if (!forms.length) return;

    forms.forEach((form) => {
        if (form.dataset.premiumFormReady === "true") return;
        form.dataset.premiumFormReady = "true";
        form.setAttribute("novalidate", "true");

        const fields = form.querySelectorAll("input, select, textarea");
        fields.forEach((field) => {
            if (field.type === "checkbox") return;
            if (!field.parentElement.querySelector(".field-error")) {
                const error = document.createElement("small");
                error.className = "field-error";
                field.insertAdjacentElement("afterend", error);
            }
        });

        let success = form.querySelector(".form-success-message");
        if (!success) {
            success = document.createElement("div");
            success.className = "form-success-message";
            success.setAttribute("role", "status");
            success.innerHTML = `<i data-lucide="check-circle-2"></i><span>Request sent successfully. We will route your project details for provider comparison.</span>`;
            form.appendChild(success);
        }

        form.addEventListener("input", (event) => {
            validateField(event.target);
            success.classList.remove("is-visible");
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let isValid = true;
            fields.forEach((field) => {
                if (!validateField(field)) isValid = false;
            });

            if (!isValid) {
                form.classList.add("was-validated");
                const firstInvalid = form.querySelector(":invalid");
                firstInvalid?.focus();
                return;
            }

            form.classList.remove("was-validated");
            success.classList.add("is-visible");
            form.reset();
            if (window.lucide) window.lucide.createIcons();
        });
    });
}

function validateField(field) {
    if (!field || !(field instanceof HTMLElement)) return true;
    const error = field.parentElement?.querySelector(".field-error");
    if (field.type === "checkbox") return field.checked || !field.required;

    let message = "";
    if (field.required && !field.value.trim()) {
        message = "This field is required.";
    } else if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        message = "Enter a valid email address.";
    } else if (field.type === "tel" && field.value && field.value.replace(/\D/g, "").length < 10) {
        message = "Enter a valid phone number.";
    }

    if (error) error.textContent = message;
    field.classList.toggle("is-invalid", Boolean(message));
    return !message;
}
