class ChessboardController {

  /**
   * @param {ChessboardModel} chessboardModel
   * @param {ChessboardView} chessboardView
   */
  constructor(chessboardModel, chessboardView) {
    this.chessboardModel = chessboardModel
    this.chessboardView = chessboardView
    chessboardView.setClickOnFieldListener(this.clickOnFieldEvent)
  }

  /**
   * Calls when mouse clicks on field at (row, column) position
   */
  clickOnFieldEvent(row, column) {
    // TODO
    alert('you clicked on (' + row + ', ' + column + ')')
  }

  /**
   * @see {@link ChessboardModel.setBoard}
   * @param {string} FAN
   */
  setChessboard(FAN) {
    this.chessboardModel.setBoard(FAN)
    const board = this.chessboardModel.board
    for (let row = 0; row < board.length; ++row) {
      for (let column = 0; column < board[0].length; ++column) {
        switch (board[row][column]) {
          case 0:
            this.chessboardView.setEmptyField(row, column)
            break;
          case 1:
            this.chessboardView.setBlackPawn(row, column)
            break;
          case 2:
            this.chessboardView.setWhitePawn(row, column)
            break;
          case 3:
            this.chessboardView.setBlackQueen(row, column)
            break;
          case 4:
            this.chessboardView.setWhiteQueen(row, column)
            break;
          default:
            throw new Error('Unknown piece: ' + board[row][column])
        }
      }
    }
  }
}
