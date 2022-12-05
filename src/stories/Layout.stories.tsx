import { BrowserRouter } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default {
  title: "Checkers/Layout",
  parameters: { layout: "fullscreen" },
};

const TemplateHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

const TemplateFooter = () => (
  <>
    <main></main>
    <Footer />
  </>
);

export const header = TemplateHeader.bind({});

export const footer = TemplateFooter.bind({});
