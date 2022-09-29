class ChessboardView {

  constructor() {
    this.cells = Array.from(document.getElementsByClassName('chessboard')[0].firstElementChild.children).map(x => Array.from(x.children))
  }

  /**
   * @param {(row: number, column: number) => void} clickOnFieldEvent
   */
  setClickOnFieldListener(clickOnFieldEvent) {
    for (let row = 0; row < this.cells.length; ++row) {
      for (let column = 0; column < this.cells[0].length; ++column) {
        this.cells[row][column].onclick = () => clickOnFieldEvent(row, column)
      }
    }
  }

  setEmptyField(row, column) {
    const classList = this.cells[row][column].classList
    if (classList.length > 1) classList.remove(classList.item(1))
  }

  setWhitePawn(row, column) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-white_pawn')
  }

  setBlackPawn(row, column) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-black_pawn')
  }

  setWhiteQueen(row, column) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-white_queen')
  }

  setBlackQueen(row, column) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-black_queen')
  }
}
