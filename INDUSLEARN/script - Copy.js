const translations = {
    "home": { "ar": "الرئيسية", "en": "Home" },
    "courses": { "ar": "المواد الدراسية", "en": "Courses" },
    "about": { "ar": "من نحن", "en": "About Us" },
    "welcome": { "ar": "مرحبًا بك في IndusLearn", "en": "Welcome to IndusLearn" },
    "intro": { "ar": "منصة تعليمية للهندسة الصناعية توفر لك ملخصات ودروسًا متكاملة.", "en": "An educational platform for Industrial Engineering providing summaries and lessons." }
};

const langToggle = document.getElementById("lang-toggle");
let currentLang = "ar";

langToggle.addEventListener("click", () => {
    currentLang = (currentLang === "ar") ? "en" : "ar";
    document.documentElement.lang = currentLang;
    langToggle.textContent = (currentLang === "ar") ? "English" : "العربية";

    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        element.textContent = translations[key][currentLang];
    });
});
