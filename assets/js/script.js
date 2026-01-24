const translations = {
    ar: {
        hero_badge: "نظام رسمي معتمد",
        hero_title: "نظام الحضور والغياب الذكي<br><span class='text-highlight'>للتعليم الطبي</span>",
        hero_subtitle: "حل تقني متكامل وآمن يعمل بدون إنترنت<br>مصمم خصيصاً لخدمة كليات الطب ومراكز التدريب",
        download_on: "تحميل لأجهزة",
        nav_lecturer: "للمحاضرين",

        // How It Works
        how_it_works_title: "كيف يعمل النظام",
        step_open: "فتح التطبيق",
        step_connect: "تلامس أو اختيار",
        step_done: "تم التسجيل",

        // Features
        feat_secure_title: "آمن وموثوق",
        feat_secure_desc: "يعتمد على تقنيات مشفرة لضمان دقة البيانات",
        feat_offline_title: "يعمل بدون إنترنت",
        feat_offline_desc: "لا يشترط اتصال الطالب بالإنترنت لتسجيل الحضور",
        feat_tech_title: "تقنيات حديثة",
        feat_tech_desc: "دعم كامل لتقنيات NFC و Bluetooth",
        feat_dashboard_title: "لوحة تحكم متقدمة",
        feat_dashboard_desc: "تقارير لحظية وإحصائيات شاملة للمؤسسات",

        // Institutions
        inst_badge: "للمؤسسات",
        inst_title: "إدارة مركزية لمؤسستك",
        inst_desc: "لوحة تحكم متقدمة تمكنك من متابعة نسب الحضور لحظياً وتصدير تقارير تفصيلية لكل كورس ومجموعة ومحاضر ومتعلم",
        inst_feat1: "متابعة لحظية للحضور",
        inst_feat2: "تقارير تفصيلية قابلة للتصدير",
        inst_feat3: "إدارة صلاحيات المحاضرين",
        inst_cta: "تواصل معنا",

        footer_copy: "Med Attendance 2026 جميع الحقوق محفوظة",
        coming_soon_ios: "قريباً في App Store",
        coming_soon_android: "قريباً في Google Play",
        support_btn: "الدعم الفني",

        // Modal
        modal_title: "طريقة التحميل على iPhone",
        step1_title: "خطوة 1: تحميل TestFlight",
        step1_desc: "يجب تحميل تطبيق TestFlight أولاً من متجر أبل لتتمكن من تثبيت النسخة التجريبية",
        btn_download_testflight: "تحميل TestFlight",
        step2_title: "خطوة 2: تحميل BardiMad",
        step2_desc: "الآن يمكنك الانضمام للنسخة التجريبية وتحميل تطبيق الطالب",
        btn_download_app: "تحميل التطبيق (طلاب)",
        btn_next: "التالي",
        lang_btn_text: "English",
        download_started: "تم بدء التنزيل! تفقد مجلد التنزيلات 📥"
    },
    en: {
        hero_badge: "Official Certified System",
        hero_title: "Smart Attendance System<br><span class='text-highlight'>For Medical Education</span>",
        hero_subtitle: "Integrated Secure Offline-First Solution<br>Designed for Medical Faculties and Training Centers",
        download_on: "Download for",
        nav_lecturer: "For Lecturers",

        // How It Works
        how_it_works_title: "How It Works",
        step_open: "Open App",
        step_connect: "Touch or Select",
        step_done: "Registered",

        // Features
        feat_secure_title: "Secure & Reliable",
        feat_secure_desc: "Uses encrypted technologies to ensure data accuracy",
        feat_offline_title: "Works Offline",
        feat_offline_desc: "Student internet connection not required",
        feat_tech_title: "Modern Tech",
        feat_tech_desc: "Full support for NFC and Bluetooth technologies",
        feat_dashboard_title: "Advanced Dashboard",
        feat_dashboard_desc: "Real-time reports and comprehensive statistics for institutions",

        // Institutions
        inst_badge: "For Institutions",
        inst_title: "Centralized Management",
        inst_desc: "An advanced dashboard that enables you to monitor attendance rates in real-time and export detailed reports for each course, group, lecturer, and learner",
        inst_feat1: "Real-time attendance monitoring",
        inst_feat2: "Exportable detailed reports",
        inst_feat3: "Lecturer permissions management",
        inst_cta: "Contact Us",

        footer_copy: "Med Attendance 2026 All Rights Reserved",
        coming_soon_ios: "Coming Soon on App Store",
        coming_soon_android: "Coming Soon on Google Play",
        support_btn: "Technical Support",

        // Modal
        modal_title: "Installation on iPhone",
        step1_title: "Step 1: Download TestFlight",
        step1_desc: "Download TestFlight from the Apple Store to install the beta version",
        btn_download_testflight: "Download TestFlight",
        step2_title: "Step 2: Download BardiMad",
        step2_desc: "Join the beta and download the student app",
        btn_download_app: "Download App (Student)",
        btn_next: "Next",
        lang_btn_text: "العربية",
        download_started: "Download started! Check your Downloads folder 📥"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const currentLangText = document.getElementById('current-lang-text');
    const html = document.documentElement;

    // Modal Elements
    const btnIos = document.getElementById('btn-ios');
    const modal = document.getElementById('ios-modal');
    const modalClose = document.querySelector('.modal-close');
    const btnNext = document.getElementById('btn-next-step');
    const btnAndroid = document.getElementById('btn-android');

    const step1Content = document.getElementById('step-1');
    const step2Content = document.getElementById('step-2');
    const step1Indicator = document.getElementById('step-1-indicator');
    const step2Indicator = document.getElementById('step-2-indicator');

    // State
    let currentLang = 'ar';
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Initialize Theme
    setTheme(currentTheme);

    // 4. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Toggle icon between menu and X
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close menu when clicking a nav link
        mainNav.querySelectorAll('.nav-link, .btn-ghost').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // 1. Theme Logic
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update Icon
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.setAttribute('data-lucide', 'sun');
            } else {
                icon.setAttribute('data-lucide', 'moon');
            }
            lucide.createIcons();
        }
    }

    // 2. Language Switcher
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        // Update HTML dir and lang
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Update Button Text
        currentLangText.textContent = translations[lang].lang_btn_text;

        // Update Lucide Icons (in case they need re-rendering, though mostly unrelated to lang)
        lucide.createIcons();
    }

    // 3. Modal Interactions
    if (btnIos) {
        btnIos.addEventListener('click', () => {
            modal.classList.remove('hidden');
            resetModal();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    // Step Navigation
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            // Switch to Step 2
            step1Content.classList.add('hidden');
            step2Content.classList.remove('hidden');

            step1Indicator.classList.remove('active');
            step1Indicator.innerHTML = '<i data-lucide="check" style="width:16px"></i>';
            step2Indicator.classList.add('active');

            btnNext.style.display = 'none'; // Hide next button on last step
            lucide.createIcons();
        });
    }

    function resetModal() {
        step1Content.classList.remove('hidden');
        step2Content.classList.add('hidden');

        step1Indicator.classList.add('active');
        step1Indicator.textContent = '1';
        step2Indicator.classList.remove('active');
        step1Indicator.innerHTML = '1';

        btnNext.style.display = 'inline-block';
        lucide.createIcons();
    }

    // Toast Notification Function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

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

    // Android Download Button - Show Toast
    if (btnAndroid) {
        btnAndroid.addEventListener('click', () => {
            const message = translations[currentLang].download_started;
            showToast(message);
        });
    }
});
