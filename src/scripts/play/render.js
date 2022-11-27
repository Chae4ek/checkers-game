import styles from "../../routes/styles/Play.module.scss";

export class ChessboardView {
  constructor() {
    this.cells = Array.from(document.getElementsByClassName(styles.chessboard)[0].firstElementChild.children).map((x) =>
      Array.from(x.children)
    );
    this.moveHistoryText = document.getElementById(styles["move_history__text"]);
    this.gameInfoText = document.getElementById(styles["game_info__text"]);
    this.buttonCancel = document.getElementById(styles["button__cancel"]);
    this.buttonEnd = document.getElementById(styles["button__end"]);

    this.setHistoryText(null);
    this.toggleMoveButtons(false);
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

  isEndButtonActive() {
    return !this.buttonEnd.hasAttribute("disabled");
  }

  getHistoryText() {
    return this.moveHistoryText.value;
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
      styles.chessboard__field__selected,
      styles.chessboard__field__silent_move,
      styles.chessboard__field__attack_move,
      styles.chessboard__selectable_field
    );
    switch (fieldType) {
      case FieldType.NONE:
        break;
      case FieldType.SELECTED:
        classList.add(styles.chessboard__field__selected, styles.chessboard__selectable_field);
        break;
      case FieldType.SILENT_MOVE:
        classList.add(styles.chessboard__field__silent_move, styles.chessboard__selectable_field);
        break;
      case FieldType.ATTACK_MOVE:
        classList.add(styles.chessboard__field__attack_move, styles.chessboard__selectable_field);
        break;
      default:
        throw new Error(`Unknown field type: ${fieldType}`);
    }
  }

  isSelectableField(row, column) {
    return this.cells[row][column].classList.contains(styles.chessboard__selectable_field);
  }

  setSelectableField(row, column, isSelectable) {
    if (isSelectable) this.cells[row][column].classList.add(styles.chessboard__selectable_field);
    else this.cells[row][column].classList.remove(styles.chessboard__selectable_field);
  }

  setEmptyField(row, column) {
    const classList = this.cells[row][column].classList;
    classList.remove(
      styles.chessboard__white_pawn,
      styles.chessboard__black_pawn,
      styles.chessboard__white_queen,
      styles.chessboard__black_queen
    );
  }

  setWhitePawn(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__white_pawn);
  }

  setBlackPawn(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__black_pawn);
  }

  setWhiteQueen(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__white_queen);
  }

  setBlackQueen(row, column) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__black_queen);
  }
}

export const FieldType = { NONE: 0, SELECTED: 1, SILENT_MOVE: 2, ATTACK_MOVE: 3 };
