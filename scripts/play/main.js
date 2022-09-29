let chessboardModel = new ChessboardModel()
let chessboardView = new ChessboardView()
let chessboardController = new ChessboardController(chessboardModel, chessboardView)

document.getElementById('button-example').onclick = () => clickOnExampleButton(chessboardController)
document.getElementById('button-start').onclick = () => clickOnStartButton(chessboardController)

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
