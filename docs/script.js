// The landing page is fully static; this only remembers the visitor's language.
(() => {
  const root = document.documentElement;
  const copy = {
    ru: {
      title: "Dajet — браузер для тихого интернета",
      description: "Лёгкий браузер для macOS. Чистый стартовый экран, локальная история и никакой телеметрии.",
      navLabel: "Основная навигация",
      languageLabel: "Выбрать язык",
      brandLabel: "Dajet — на главную",
      topLabel: "Наверх",
      imageAlt: "Чёрный стартовый экран Dajet с одной строкой ввода в центре.",
      ogLocale: "ru_RU"
    },
    en: {
      title: "Dajet — a quieter browser for macOS",
      description: "A lighter browser for macOS. A quiet start page, local history, and no telemetry.",
      navLabel: "Main navigation",
      languageLabel: "Choose language",
      brandLabel: "Dajet — home",
      topLabel: "Back to top",
      imageAlt: "Dajet's black start page with a single input line in the center.",
      ogLocale: "en_US"
    }
  };

  const setMeta = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
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
    setMeta('meta[name="theme-color"]', "content", "#f4f2ee");
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

    document.querySelectorAll("[data-locale-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.localeChoice === language));
    });

    if (remember) {
      try {
        localStorage.setItem("dajet-locale", language);
      } catch (_) {
        // The page works without storage; the choice just won't persist.
      }
    }
  };

  document.querySelectorAll("[data-locale-choice]").forEach((button) => {
    button.addEventListener("click", () => setLocale(button.dataset.localeChoice));
  });

  let savedLocale = "ru";
  try {
    const saved = localStorage.getItem("dajet-locale");
    if (saved && copy[saved]) savedLocale = saved;
  } catch (_) {
    // Private browsing or a storage policy should not break the landing page.
  }
  setLocale(savedLocale, false);
})();
