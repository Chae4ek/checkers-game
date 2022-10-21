class ChessboardView {
  constructor() {
    this.cells = Array.from(document.getElementsByClassName("chessboard")[0].firstElementChild.children).map((x) =>
      Array.from(x.children)
    );
    this.moveHistoryText = document.getElementById("move_history-text");
    this.moveHistoryText.value = null;
    this.gameInfoText = document.getElementById("game_info-text");
    this.buttonCancel = document.getElementById("button-cancel");
    this.buttonEnd = document.getElementById("button-end");
  }

  /**
   * @param {ChessboardController} chessboardController
   */
  setClickOnFieldListener(chessboardController) {
    for (let row = 0; row < this.cells.length; ++row) {
      for (let column = 0; column < this.cells[0].length; ++column) {
        this.cells[row][column].onclick = () => chessboardController.clickOnFieldEvent(row, column);
      }
    }
  }

  setHistoryText(text) {
    this.moveHistoryText.value = text;
  }

  setGameInfoText(text) {
    this.gameInfoText.textContent = text;
  }

  toggleMoveButtons(enable) {
    this.toggleCancelButton(enable);
    this.toggleEndButton(enable);
  }

  toggleCancelButton(enable) {
    if (enable) this.buttonCancel.removeAttribute("disabled");
    else this.buttonCancel.setAttribute("disabled", true);
  }

  toggleEndButton(enable) {
    if (enable) this.buttonEnd.removeAttribute("disabled");
    else this.buttonEnd.setAttribute("disabled", true);
  }

  /**
   * @param {number} row
   * @param {number} column
   * @param {FieldType} fieldType
   */
  setFieldType(row, column, fieldType) {
    const classList = this.cells[row][column].classList;
    classList.remove(
      "chessboard-field-selected",
      "chessboard-field-silent_move",
      "chessboard-field-attack_move",
      "chessboard-selectable_field"
    );
    switch (fieldType) {
      case FieldType.NONE:
        break;
      case FieldType.SELECTED:
        classList.add("chessboard-field-selected", "chessboard-selectable_field");
        break;
      case FieldType.SILENT_MOVE:
        classList.add("chessboard-field-silent_move", "chessboard-selectable_field");
        break;
      case FieldType.ATTACK_MOVE:
        classList.add("chessboard-field-attack_move", "chessboard-selectable_field");
        break;
      default:
        throw new Error(`Unknown field type: ${fieldType}`);
    }
  }

  isSelectableField(row, column) {
    return this.cells[row][column].classList.contains("chessboard-selectable_field");
  }

  setSelectableField(row, column, isSelectable) {
    if (isSelectable) this.cells[row][column].classList.add("chessboard-selectable_field");
    else this.cells[row][column].classList.remove("chessboard-selectable_field");
  }

  setEmptyField(row, column) {
    const classList = this.cells[row][column].classList;
    classList.remove(
      "chessboard-white_pawn",
      "chessboard-black_pawn",
      "chessboard-white_queen",
      "chessboard-black_queen"
    );
  }

  setWhitePawn(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add("chessboard-white_pawn");
  }

  setBlackPawn(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add("chessboard-black_pawn");
  }

  setWhiteQueen(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add("chessboard-white_queen");
  }

  setBlackQueen(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add("chessboard-black_queen");
  }
}

const FieldType = { NONE: 0, SELECTED: 1, SILENT_MOVE: 2, ATTACK_MOVE: 3 };
