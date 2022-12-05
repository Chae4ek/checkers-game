import { cleanup, render, screen } from "@testing-library/react";
import { Play } from "../routes/Play";
import { chessboardView } from "../scripts/play/main";
import styles from "../routes/styles/Play.module.scss";

beforeEach(() => {
  render(<Play />);
});

afterAll(() => {
  cleanup();
});

test("Set move history text", () => {
  const text = "E3-F4 f6-e5 C3-B4";
  chessboardView.setHistoryText(text);

  const history = document.getElementById(styles["move_history__text"]) as HTMLInputElement;
  expect(history).toBeInTheDocument();
  expect(history.value).toStrictEqual(text);
});

test("Set game info text", () => {
  const text = "Info: all is right";
  chessboardView.setGameInfoText(text);

  const gameInfo = screen.getByText(new RegExp(text));
  expect(gameInfo).toBeInTheDocument();
  expect(gameInfo.textContent).toStrictEqual(text);
});
