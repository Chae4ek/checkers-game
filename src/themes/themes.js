import themes from "./themes.scss";

let darkMode;

export const switchTheme = () => {
  darkMode = !darkMode;
  setThemeUnsafe(`${darkMode}`, darkMode);
};

/**
 * @param {string | boolean | undefined} mode
 */
export const setTheme = (mode) => {
  const darkModeString = mode !== undefined ? `${mode}` : localStorage.getItem("darkMode");

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkModeString === null || darkModeString === "auto") {
    darkThemeMq.onchange = (event) => setThemeUnsafe("auto", event.matches);
    setThemeUnsafe("auto", darkThemeMq.matches);
    return;
  }
  darkThemeMq.onchange = null;

  darkMode = RegExp(`^(true|${themes.theme_dark})$`).test(darkModeString);
  setThemeUnsafe(`${darkMode}`, darkMode);
};

/**
 * @param {string} mode
 * @param {boolean} newDarkMode
 */
const setThemeUnsafe = (mode, newDarkMode) => {
  localStorage.setItem("darkMode", mode);
  darkMode = newDarkMode;
  document.documentElement.className = darkMode ? themes.theme_dark : themes.theme_light;
};
