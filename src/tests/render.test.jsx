import { cleanup, render } from "@testing-library/react";
import { Play } from "../routes/Play";
import { ChessboardView } from "../scripts/play/render";
import styles from "../routes/styles/Play.module.scss";

let component;
let chessboardView;

beforeEach(() => {
  component = render(<Play />);
  chessboardView = new ChessboardView();
});

afterAll(() => {
  cleanup();
});

test("Set move history text", () => {
  const text = "E3-F4 f6-e5 C3-B4";
  chessboardView.setHistoryText(text);

  const history = document.getElementById(styles["move_history__text"]);
  expect(history).toBeInTheDocument();
  expect(history.value).toStrictEqual(text);
});

test("Set game info text", () => {
  const text = "Info: all is right";
  chessboardView.setGameInfoText(text);

  const gameInfo = component.getByText(new RegExp(text));
  expect(gameInfo).toBeInTheDocument();
  expect(gameInfo.textContent).toStrictEqual(text);
});
