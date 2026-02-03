// Translations are now loaded from translations.js

const CONSTANTS = {
    STORAGE: {
        LANG: 'lang',
        THEME: 'theme'
    },
    THEME: {
        LIGHT: 'light',
        DARK: 'dark'
    },
    LANG: {
        AR: 'ar',
        EN: 'en'
    },
    CLASSES: {
        ACTIVE: 'active',
        HIDDEN: 'hidden'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const ui = {
        langToggle: document.getElementById('lang-toggle'),
        themeToggle: document.getElementById('theme-toggle'),
        currentLangText: document.getElementById('current-lang-text'),
        html: document.documentElement,

        // Modal Elements
        btnIos: document.getElementById('btn-ios'),
        modal: document.getElementById('ios-modal'),
        modalClose: document.querySelector('.modal-close'),
        btnNext: document.getElementById('btn-next-step'),
        btnAndroid: document.getElementById('btn-android'),

        step1Content: document.getElementById('step-1'),
        step2Content: document.getElementById('step-2'),
        step1Indicator: document.getElementById('step-1-indicator'),
        step2Indicator: document.getElementById('step-2-indicator'),

        // Navigation
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        mainNav: document.getElementById('main-nav'),

        // Content Blocks
        contentEn: document.getElementById('content-en'),
        contentAr: document.getElementById('content-ar')
    };

    // State
    let currentLang = localStorage.getItem(CONSTANTS.STORAGE.LANG) || CONSTANTS.LANG.EN;
    let currentTheme = localStorage.getItem(CONSTANTS.STORAGE.THEME) || CONSTANTS.THEME.LIGHT;

    // Initialize Theme
    setTheme(currentTheme);

    // Initialize Language
    updateLanguage(currentLang);

    // --- Core Functions ---

    function setTheme(theme) {
        ui.html.setAttribute('data-theme', theme);
        localStorage.setItem(CONSTANTS.STORAGE.THEME, theme);

        const icon = ui.themeToggle?.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', theme === CONSTANTS.THEME.DARK ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }

    function updateLanguage(lang) {
        // Persist Language
        localStorage.setItem(CONSTANTS.STORAGE.LANG, lang);

        // Update HTML dir and lang
        ui.html.lang = lang;
        ui.html.dir = lang === CONSTANTS.LANG.AR ? 'rtl' : 'ltr';

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang]?.[key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Toggle Content Blocks (for pages with large bilingual content)
        if (ui.contentEn && ui.contentAr) {
            const isAr = lang === CONSTANTS.LANG.AR;
            ui.contentEn.style.display = isAr ? 'none' : 'block';
            ui.contentAr.style.display = isAr ? 'block' : 'none';
        }

        // Update Button Text
        if (ui.currentLangText) {
            ui.currentLangText.textContent = translations[lang]?.lang_btn_text;
        }

        // Update Lucide Icons
        lucide.createIcons();
    }

    function resetModal() {
        ui.step1Content?.classList.remove(CONSTANTS.CLASSES.HIDDEN);
        ui.step2Content?.classList.add(CONSTANTS.CLASSES.HIDDEN);

        ui.step1Indicator?.classList.add(CONSTANTS.CLASSES.ACTIVE);
        if (ui.step1Indicator) ui.step1Indicator.textContent = '1';

        ui.step2Indicator?.classList.remove(CONSTANTS.CLASSES.ACTIVE);
        if (ui.step2Indicator) ui.step2Indicator.innerHTML = '2';

        if (ui.btnNext) ui.btnNext.style.display = 'inline-block';
        lucide.createIcons();
    }

    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        existingToast?.remove();

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i data-lucide="download" class="toast-icon"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        lucide.createIcons();

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide and remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- Event Listeners ---

    // Mobile Menu Toggle
    if (ui.mobileMenuToggle && ui.mainNav) {
        ui.mobileMenuToggle.addEventListener('click', () => {
            ui.mainNav.classList.toggle(CONSTANTS.CLASSES.ACTIVE);

            // Toggle icon between menu and X
            const icon = ui.mobileMenuToggle.querySelector('i');
            const isActive = ui.mainNav.classList.contains(CONSTANTS.CLASSES.ACTIVE);
            icon?.setAttribute('data-lucide', isActive ? 'x' : 'menu');
            lucide.createIcons();
        });

        // Close menu when clicking a nav link
        ui.mainNav.querySelectorAll('.nav-link, .btn-ghost').forEach(link => {
            link.addEventListener('click', () => {
                ui.mainNav.classList.remove(CONSTANTS.CLASSES.ACTIVE);
                const icon = ui.mobileMenuToggle.querySelector('i');
                icon?.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Theme Logic
    ui.themeToggle?.addEventListener('click', () => {
        currentTheme = currentTheme === CONSTANTS.THEME.LIGHT ? CONSTANTS.THEME.DARK : CONSTANTS.THEME.LIGHT;
        setTheme(currentTheme);
    });

    // Language Switcher
    ui.langToggle?.addEventListener('click', () => {
        currentLang = currentLang === CONSTANTS.LANG.AR ? CONSTANTS.LANG.EN : CONSTANTS.LANG.AR;
        updateLanguage(currentLang);
    });

    // Modal Interactions
    ui.btnIos?.addEventListener('click', () => {
        ui.modal?.classList.remove(CONSTANTS.CLASSES.HIDDEN);
        resetModal();
    });

    ui.modalClose?.addEventListener('click', () => {
        ui.modal?.classList.add(CONSTANTS.CLASSES.HIDDEN);
    });

    // Close on click outside
    ui.modal?.addEventListener('click', (e) => {
        if (e.target === ui.modal) {
            ui.modal.classList.add(CONSTANTS.CLASSES.HIDDEN);
        }
    });

    // Step Navigation
    ui.btnNext?.addEventListener('click', () => {
        // Switch to Step 2
        ui.step1Content?.classList.add(CONSTANTS.CLASSES.HIDDEN);
        ui.step2Content?.classList.remove(CONSTANTS.CLASSES.HIDDEN);

        ui.step1Indicator?.classList.remove(CONSTANTS.CLASSES.ACTIVE);
        if (ui.step1Indicator) ui.step1Indicator.innerHTML = '<i data-lucide="check" style="width:16px"></i>';

        ui.step2Indicator?.classList.add(CONSTANTS.CLASSES.ACTIVE);

        ui.btnNext.style.display = 'none'; // Hide next button on last step
        lucide.createIcons();
    });

    // Android Download Button - Show Toast
    ui.btnAndroid?.addEventListener('click', () => {
        const message = translations[currentLang]?.download_started;
        showToast(message);
    });

});
