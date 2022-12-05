import themes from "./themes.module.scss";

let darkMode: boolean;

export const switchTheme = () => {
  darkMode = !darkMode;
  setThemeUnsafe(`${darkMode}`, darkMode);
};

export const setTheme = (mode?: string | boolean) => {
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

const setThemeUnsafe = (mode: string, newDarkMode: boolean) => {
  localStorage.setItem("darkMode", mode);
  darkMode = newDarkMode;
  document.documentElement.className = darkMode ? themes.theme_dark : themes.theme_light;
};
