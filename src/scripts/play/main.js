import { Rules, ChessboardModel } from "./engine";
import { ChessboardView } from "./render";
import { ChessboardController } from "./controller";

let chessboardController = null;

export const postInit = () => {
  const rules = new Rules(false, true, true, true, false);
  const chessboardModel = new ChessboardModel(rules);
  const chessboardView = new ChessboardView();
  chessboardController = new ChessboardController(chessboardModel, chessboardView);
};

export const clickOnShowButton = () => {
  chessboardController.clickOnShowButton();
};

export const clickOnCopyButton = () => {
  chessboardController.copyMoveHistoryToClipboard();
};

export const clickOnExampleButton = () => {
  chessboardController.setChessboard("-p-p---pp-p-p-p------p----p-p-p----P-P--P-P---p--P-P-P-PP-P-P-P-");
};

export const clickOnStartButton = () => {
  chessboardController.setChessboard("-p-p-p-pp-p-p-p--p-p-p-p----------------P-P-P-P--P-P-P-PP-P-P-P-");
};

export const clickOnCancelButton = () => {
  chessboardController.clickOnCancelButton();
};

export const clickOnEndButton = () => {
  chessboardController.clickOnEndButton();
};
