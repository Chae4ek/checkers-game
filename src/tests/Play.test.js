import { render, screen } from "@testing-library/react";
import { Play } from "../routes/pages/Play";

test("Renders play page", () => {
  render(<Play />);
  const linkElement = screen.getByText(/Нажмите "Старт", чтобы начать/i);
  expect(linkElement).toBeInTheDocument();
});
