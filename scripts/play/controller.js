class ChessboardController {

  /**
   * @param {ChessboardModel} chessboardModel
   * @param {ChessboardView} chessboardView
   */
  constructor(chessboardModel, chessboardView) {
    this.chessboardModel = chessboardModel
    this.chessboardView = chessboardView
    this.selectedField = null
    chessboardView.setClickOnFieldListener(this)
  }

  /**
   * Calls when mouse clicks on field at (row, column) position
   */
  clickOnFieldEvent(row, column) {
    if (!this.chessboardView.isSelectableField(row, column)) return

    const currentField = this.chessboardModel.getField(row, column)
    if (this.selectedField == currentField) {
      this.selectedField = null
      this.#toggleHints(currentField, false)
      this.#toggleAllSelectableFields(true)
    } else {
      if (this.selectedField == null) {
        this.#toggleAllSelectableFields(false)
        this.#toggleHints(this.selectedField = currentField, true)
      } else {
        this.#toggleHints(this.selectedField, false)
        this.#toggleAllSelectableFields(true)
        this.selectedField = null
      }
    }
  }

  #toggleAllSelectableFields(enableSelectable) { // TODO: specify param whose turn it is now
    this.chessboardModel.forEachField((field) => {
      if (field.piece != null) this.chessboardView.setSelectableField(field.row, field.column, enableSelectable)
      return true
    })
  }

  /**
   * Toggles visual hints for specified field based on possible moves from it
   */
  #toggleHints(field, enableHints) {
    this.chessboardView.setFieldType(field.row, field.column, enableHints ? FieldType.SELECTED : FieldType.NONE)
    const moves = this.chessboardModel.getPossibleMoves(field.row, field.column)
    moves.get(MoveType.SILENT)?.forEach((field) => {
      this.chessboardView.setFieldType(field.row, field.column, enableHints ? FieldType.SILENT_MOVE : FieldType.NONE)
    })
    moves.get(MoveType.ATTACK)?.forEach((field) => {
      this.chessboardView.setFieldType(field.row, field.column, enableHints ? FieldType.ATTACK_MOVE : FieldType.NONE)
    })
  }

  /**
   * @see {@link ChessboardModel.setBoard}
   * @param {string} FAN
   */
  setChessboard(FAN) {
    if (this.selectedField != null) this.clickOnFieldEvent(this.selectedField.row, this.selectedField.column)
    this.chessboardModel.setBoard(FAN)

    const board = this.chessboardModel.board
    for (let row = 0; row < board.length; ++row) {
      for (let column = 0; column < board[0].length; ++column) {
        const piece = board[row][column].piece
        if (piece == null) this.chessboardView.setEmptyField(row, column)
        else if (piece instanceof Pawn) {
          if (piece.color == PieceColor.BLACK) this.chessboardView.setBlackPawn(row, column, true) // TODO: specify param whose turn it is now
          else this.chessboardView.setWhitePawn(row, column, true) // TODO
        }
        else if (piece instanceof Queen) {
          if (piece.color == PieceColor.BLACK) this.chessboardView.setBlackQueen(row, column, true) // TODO
          else this.chessboardView.setWhiteQueen(row, column, true) // TODO
        }
        else throw new Error(`Unknown field code: ${piece}`)
      }
    }
  }
}
