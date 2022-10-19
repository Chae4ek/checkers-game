let rules = new Rules(true, true, true, true);
let chessboardModel = new ChessboardModel(rules);
let chessboardView = new ChessboardView();
let chessboardController = new ChessboardController(
  chessboardModel,
  chessboardView
);

document.getElementById("button-copy").onclick = () =>
  clickOnCopyButton(chessboardController);
document.getElementById("button-example").onclick = () =>
  clickOnExampleButton(chessboardController);
document.getElementById("button-start").onclick = () =>
  clickOnStartButton(chessboardController);
document.getElementById("button-cancel").onclick = () =>
  clickOnCancelButton(chessboardController);
document.getElementById("button-end").onclick = () =>
  clickOnEndButton(chessboardController);

function clickOnCopyButton(chessboardController) {
  chessboardController.copyMoveHistoryToClipboard();
}

function clickOnExampleButton(chessboardController) {
  chessboardController.setChessboard(
    "-p------" +
      "--p-p---" +
      "-------p" +
      "--p-----" +
      "-----P-P" +
      "--------" +
      "--------" +
      "--q-----"
  );
}

function clickOnStartButton(chessboardController) {
  chessboardController.setChessboard(
    "-p-p-p-p" +
      "p-p-p-p-" +
      "-p-p-p-p" +
      "--------" +
      "--------" +
      "P-P-P-P-" +
      "-P-P-P-P" +
      "P-P-P-P-"
  );
}

function clickOnCancelButton(chessboardController) {
  chessboardController.clickOnCancelButton();
}

function clickOnEndButton(chessboardController) {
  chessboardController.clickOnEndButton();
}
