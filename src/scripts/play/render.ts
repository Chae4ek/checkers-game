import styles from "../../routes/styles/Play.module.scss";
import { ChessboardController } from "./controller";

export class ChessboardView {
  cells: HTMLElement[][];
  moveHistoryText: HTMLInputElement;
  gameInfoText: HTMLElement;
  buttonCancel: HTMLElement;
  buttonEnd: HTMLElement;

  constructor() {
    this.cells = Array.from(document.getElementsByClassName(styles.chessboard)[0].firstElementChild!.children).map(
      (x) => Array.from(x.children)
    ) as HTMLElement[][];
    this.moveHistoryText = document.getElementById(styles["move_history__text"]) as HTMLInputElement;
    this.gameInfoText = document.getElementById(styles["game_info__text"])!;
    this.buttonCancel = document.getElementById(styles["button__cancel"])!;
    this.buttonEnd = document.getElementById(styles["button__end"])!;

    this.setHistoryText("");
    this.toggleMoveButtons(false);
  }

  setClickOnFieldListener(chessboardController: ChessboardController) {
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

  setHistoryText(text: string) {
    this.moveHistoryText.value = text;
  }

  setGameInfoText(text: string) {
    this.gameInfoText.textContent = text;
  }

  toggleMoveButtons(enable: boolean) {
    this.toggleCancelButton(enable);
    this.toggleEndButton(enable);
  }

  toggleCancelButton(enable: boolean) {
    if (enable) this.buttonCancel.removeAttribute("disabled");
    else this.buttonCancel.setAttribute("disabled", "true");
  }

  toggleEndButton(enable: boolean) {
    if (enable) this.buttonEnd.removeAttribute("disabled");
    else this.buttonEnd.setAttribute("disabled", "true");
  }

  setFieldType(row: number, column: number, fieldType: FieldType) {
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

  isSelectableField(row: number, column: number) {
    return this.cells[row][column].classList.contains(styles.chessboard__selectable_field);
  }

  setSelectableField(row: number, column: number, isSelectable: boolean) {
    if (isSelectable) this.cells[row][column].classList.add(styles.chessboard__selectable_field);
    else this.cells[row][column].classList.remove(styles.chessboard__selectable_field);
  }

  setEmptyField(row: number, column: number) {
    const classList = this.cells[row][column].classList;
    classList.remove(
      styles.chessboard__white_pawn,
      styles.chessboard__black_pawn,
      styles.chessboard__white_queen,
      styles.chessboard__black_queen
    );
  }

  setWhitePawn(row: number, column: number) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__white_pawn);
  }

  setBlackPawn(row: number, column: number) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__black_pawn);
  }

  setWhiteQueen(row: number, column: number) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__white_queen);
  }

  setBlackQueen(row: number, column: number) {
    this.setEmptyField(row, column);
    this.cells[row][column].classList.add(styles.chessboard__black_queen);
  }
}

export enum FieldType {
  NONE,
  SELECTED,
  SILENT_MOVE,
  ATTACK_MOVE,
}
