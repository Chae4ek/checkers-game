class ChessboardView {

  constructor() {
    this.cells = Array.from(document.getElementsByClassName('chessboard')[0].firstElementChild.children).map(x => Array.from(x.children))
  }

  /**
   * @param {ChessboardController} chessboardController
   */
  setClickOnFieldListener(chessboardController) {
    for (let row = 0; row < this.cells.length; ++row) {
      for (let column = 0; column < this.cells[0].length; ++column) {
        this.cells[row][column].onclick = () => chessboardController.clickOnFieldEvent(row, column)
      }
    }
  }

  /**
   * @param {number} row 
   * @param {number} column 
   * @param {FieldType} fieldType 
   */
  setFieldType(row, column, fieldType) {
    const classList = this.cells[row][column].classList
    classList.remove('chessboard-field-selected', 'chessboard-field-silent_move', 'chessboard-field-attack_move', 'chessboard-selectable_field')
    switch (fieldType) {
      case FieldType.NONE:
        break;
      case FieldType.SELECTED:
        classList.add('chessboard-field-selected', 'chessboard-selectable_field')
        break;
      case FieldType.SILENT_MOVE:
        classList.add('chessboard-field-silent_move', 'chessboard-selectable_field')
        break;
      case FieldType.ATTACK_MOVE:
        classList.add('chessboard-field-attack_move', 'chessboard-selectable_field')
        break;
      default:
        throw new Error(`Unknown field type: ${fieldType}`)
    }
  }

  isSelectableField(row, column) {
    return this.cells[row][column].classList.contains('chessboard-selectable_field')
  }

  setSelectableField(row, column, isSelectable) {
    if (isSelectable) this.cells[row][column].classList.add('chessboard-selectable_field')
    else this.cells[row][column].classList.remove('chessboard-selectable_field')
  }

  setEmptyField(row, column) {
    const classList = this.cells[row][column].classList
    while (classList.length > 1) classList.remove(classList.item(1))
  }

  setWhitePawn(row, column, isSelectable) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-white_pawn')
    this.setSelectableField(row, column, isSelectable)
  }

  setBlackPawn(row, column, isSelectable) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-black_pawn')
    this.setSelectableField(row, column, isSelectable)
  }

  setWhiteQueen(row, column, isSelectable) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-white_queen')
    this.setSelectableField(row, column, isSelectable)
  }

  setBlackQueen(row, column, isSelectable) {
    this.setEmptyField(row, column)
    this.cells[row][column].classList.add('chessboard-black_queen')
    this.setSelectableField(row, column, isSelectable)
  }
}

const FieldType = { NONE: 0, SELECTED: 1, SILENT_MOVE: 2, ATTACK_MOVE: 3 }
