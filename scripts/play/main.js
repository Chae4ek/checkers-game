const rules = new Rules(false, true, true, true, false);
const chessboardModel = new ChessboardModel(rules);
const chessboardView = new ChessboardView();
const chessboardController = new ChessboardController(chessboardModel, chessboardView);

document.getElementById("button-copy").onclick = () => clickOnCopyButton(chessboardController);
document.getElementById("button-example").onclick = () => clickOnExampleButton(chessboardController);
document.getElementById("button-start").onclick = () => clickOnStartButton(chessboardController);
document.getElementById("button-cancel").onclick = () => clickOnCancelButton(chessboardController);
document.getElementById("button-end").onclick = () => clickOnEndButton(chessboardController);

function clickOnCopyButton(chessboardController) {
  chessboardController.copyMoveHistoryToClipboard();
}

function clickOnExampleButton(chessboardController) {
  chessboardController.setChessboard(
    // "-p------" + "--p-p---" + "-------p" + "--p-----" + "-----P-P" + "--------" + "--------" + "--q-----"
    "-p-p---p" + "p-p-p-p-" + "-----p--" + "--p-p-p-" + "---P-P--" + "P-P---p-" + "-P-P-P-P" + "P-P-P-P-"
  );
}

function clickOnStartButton(chessboardController) {
  chessboardController.setChessboard(
    "-p-p-p-p" + "p-p-p-p-" + "-p-p-p-p" + "--------" + "--------" + "P-P-P-P-" + "-P-P-P-P" + "P-P-P-P-"
  );
}

function clickOnCancelButton(chessboardController) {
  chessboardController.clickOnCancelButton();
}

function clickOnEndButton(chessboardController) {
  chessboardController.clickOnEndButton();
}
