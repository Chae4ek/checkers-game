import { setTheme } from "../src/themes/themes";
import "../src/index.css";
import themes from "../src/themes/themes.scss";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: themes.theme_light,
    toolbar: {
      icon: "circlehollow",
      items: [
        { title: "Light", value: themes.theme_light },
        { title: "Dark", value: themes.theme_dark },
      ],
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: { disable: true, grid: { disable: true } },
};

const withTheme = (Story, context) => {
  const { theme } = context.globals;
  setTheme(theme);
  return <Story />;
};

export const decorators = [withTheme];
