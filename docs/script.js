// The landing page is fully static. These controls remember language and theme.
(() => {
  const root = document.documentElement;
  const copy = {
    ru: {
      title: "Dajet — браузер для тихого интернета",
      description: "Лёгкий браузер для macOS. Тёмный стартовый экран, локальная история и никакой телеметрии.",
      navLabel: "Основная навигация",
      languageLabel: "Выбрать язык",
      brandLabel: "Dajet — на главную",
      topLabel: "Наверх",
      imageAlt: "Чёрный стартовый экран Dajet с одной строкой ввода в центре.",
      themeToLight: "Переключить на светлую тему",
      themeToDark: "Переключить на тёмную тему",
      ogLocale: "ru_RU"
    },
    en: {
      title: "Dajet — a quieter browser for macOS",
      description: "A lighter browser for macOS. A dark start page, local history, and no telemetry.",
      navLabel: "Main navigation",
      languageLabel: "Choose language",
      brandLabel: "Dajet — home",
      topLabel: "Back to top",
      imageAlt: "Dajet's black start page with a single input line in the center.",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
      ogLocale: "en_US"
    }
  };

  const setMeta = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  };

  const updateThemeLabel = () => {
    const control = document.querySelector("[data-theme-toggle]");
    if (!control) return;
    const language = root.dataset.locale === "en" ? "en" : "ru";
    const key = root.dataset.theme === "light" ? "themeToDark" : "themeToLight";
    const label = copy[language][key];
    control.setAttribute("aria-label", label);
    control.setAttribute("title", label);
  };

  const setTheme = (theme, remember = true) => {
    const mode = theme === "light" ? "light" : "dark";
    root.dataset.theme = mode;
    setMeta('meta[name="theme-color"]', "content", mode === "dark" ? "#15181c" : "#f4f2ee");
    setMeta('meta[name="color-scheme"]', "content", mode);
    updateThemeLabel();

    if (remember) {
      try {
        localStorage.setItem("dajet-theme", mode);
      } catch (_) {
        // The page still works if storage is unavailable.
      }
    }
  };

  const setLocale = (locale, remember = true) => {
    const language = copy[locale] ? locale : "ru";
    const text = copy[language];
    root.dataset.locale = language;
    root.lang = language;
    document.querySelectorAll("[data-copy]").forEach((node) => {
      node.lang = node.dataset.copy;
    });
    document.title = text.title;
    setMeta('meta[name="description"]', "content", text.description);
    setMeta('meta[property="og:title"]', "content", text.title);
    setMeta('meta[property="og:description"]', "content", text.description);
    setMeta('meta[property="og:locale"]', "content", text.ogLocale);
    setMeta('meta[name="twitter:title"]', "content", text.title);
    setMeta('meta[name="twitter:description"]', "content", text.description);
    setMeta(".navigation", "aria-label", text.navLabel);
    setMeta("[data-locale-switch]", "aria-label", text.languageLabel);
    setMeta(".start-screen", "alt", text.imageAlt);
    document.querySelectorAll(".brand").forEach((brand) => brand.setAttribute("aria-label", text.brandLabel));
    setMeta(".back-to-top", "aria-label", text.topLabel);
    updateThemeLabel();

    document.querySelectorAll("[data-locale-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.localeChoice === language));
    });

    if (remember) {
      try {
        localStorage.setItem("dajet-locale", language);
      } catch (_) {
        // The page works if the visitor's browser blocks storage.
      }
    }
  };

  document.querySelectorAll("[data-locale-choice]").forEach((button) => {
    button.addEventListener("click", () => setLocale(button.dataset.localeChoice));
  });

  const themeToggle = document.querySelector("[data-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(root.dataset.theme === "light" ? "dark" : "light");
    });
  }

  let savedLocale = "ru";
  let savedTheme = "dark";
  try {
    const locale = localStorage.getItem("dajet-locale");
    const theme = localStorage.getItem("dajet-theme");
    if (locale && copy[locale]) savedLocale = locale;
    if (theme === "light" || theme === "dark") savedTheme = theme;
  } catch (_) {
    // Private browsing should not break the landing page.
  }
  setLocale(savedLocale, false);
  setTheme(savedTheme, false);
})();
