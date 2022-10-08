let rules = new Rules(false, true)
let chessboardModel = new ChessboardModel(rules)
let chessboardView = new ChessboardView()
let chessboardController = new ChessboardController(chessboardModel, chessboardView)

document.getElementById('button-copy').onclick = () => clickOnCopyButton(chessboardController)
document.getElementById('button-example').onclick = () => clickOnExampleButton(chessboardController)
document.getElementById('button-start').onclick = () => clickOnStartButton(chessboardController)

function clickOnCopyButton(chessboardController) {
  chessboardController.copyMoveHistoryToClipboard()
}

function clickOnExampleButton(chessboardController) {
  chessboardController.setChessboard(
    '-p------' +
    '--p-p---' +
    '-------p' +
    '--p-----' +
    '-----P-P' +
    '--------' +
    '--------' +
    '--q-----')
}

function clickOnStartButton(chessboardController) {
  chessboardController.setChessboard(
    '-p-p-p-p' +
    'p-p-p-p-' +
    '-p-p-p-p' +
    '--------' +
    '--------' +
    'P-P-P-P-' +
    '-P-P-P-P' +
    'P-P-P-P-')
}
