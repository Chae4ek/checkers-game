class ChessboardController {
  /**
   * @param {ChessboardModel} chessboardModel
   * @param {ChessboardView} chessboardView
   */
  constructor(chessboardModel, chessboardView) {
    this.chessboardModel = chessboardModel;
    this.chessboardView = chessboardView;
    this.selectedField = null;
    chessboardView.setClickOnFieldListener(this);
  }

  /**
   * Calls when mouse clicks on field at (row, column) position
   */
  clickOnFieldEvent(row, column) {
    if (!this.chessboardView.isSelectableField(row, column)) return;

    const clickedField = this.chessboardModel.getField(row, column);

    if (this.selectedField === clickedField) this.#unsetSelectedField();
    else if (this.selectedField === null) this.#setSelectedField(clickedField);
    else this.#changeSelectedField(clickedField);
  }

  #unsetSelectedField() {
    const clickedField = this.selectedField;

    this.#disableHints(clickedField);

    if (this.chessboardModel.isNowChainAttack()) {
      this.chessboardView.setSelectableField(clickedField.row, clickedField.column, true);
    } else {
      this.#toggleSelectableFieldsForCurrentPlayer(true);
    }
  }

  #setSelectedField(clickedField) {
    this.#toggleSelectableFieldsForCurrentPlayer(false);
    this.#enableHints(clickedField);
  }

  #changeSelectedField(clickedField) {
    const moveFromField = this.selectedField;
    this.#disableHints(this.selectedField);
    this.#makeMove(moveFromField, clickedField);
  }

  #disableHints(clickedField) {
    this.selectedField = null;
    this.#toggleHints(clickedField, false);
  }

  #enableHints(clickedField) {
    this.selectedField = clickedField;
    this.#toggleHints(this.selectedField, true);
  }

  /**
   * @param {Field} fromField
   * @param {Field} toField
   */
  #makeMove(fromField, toField) {
    const move = this.chessboardModel.tryMove(fromField, toField);
    if (move === null) return;

    this.#renderMove(move);
    this.chessboardView.setHistoryText(this.chessboardModel.moveHistory.convertToString());

    const willThatChainMove = this.#willThatChainMove(move);
    if (willThatChainMove) this.#enableHints(toField);

    this.chessboardView.toggleCancelButton(true);
    if (this.#isThisEndMove(willThatChainMove)) this.chessboardView.toggleEndButton(true);
  }

  #renderMove(move) {
    this.#renderPiece(null, move.fromField.row, move.fromField.column);
    this.#renderPiece(move.toField.piece, move.toField.row, move.toField.column);
    if (move.attackedPiece !== null) {
      this.#renderPiece(null, move.attackedField.row, move.attackedField.column);
    }
  }

  #willThatChainMove(move) {
    if (!this.chessboardModel.rules.canAttackChainMove || move.attackedPiece === null) return false;

    const movesFromDestination = this.chessboardModel.getPossibleMoves(move.toField.row, move.toField.column);
    if (movesFromDestination.has(MoveType.ATTACK)) return true;

    return false;
  }

  #isThisEndMove(willThatChainMove) {
    return !willThatChainMove || this.chessboardModel.rules.canInterruptChainMove;
  }

  clickOnCancelButton() {
    if (this.selectedField !== null) this.#disableHints(this.selectedField);

    const lastMove = this.chessboardModel.undoMove();
    if (lastMove === null) return;

    this.#renderUndoMove(lastMove);
    this.chessboardView.setHistoryText(this.chessboardModel.moveHistory.convertToString());

    if (this.chessboardModel.isNowChainAttack()) {
      this.#enableHints(lastMove.fromField);
      if (!this.chessboardModel.rules.canInterruptChainMove) this.chessboardView.toggleEndButton(false);
    } else {
      this.chessboardView.setSelectableField(lastMove.toField.row, lastMove.toField.column, false);
      this.#toggleSelectableFieldsForCurrentPlayer(true);
      this.chessboardView.toggleMoveButtons(false);
    }
  }

  #renderUndoMove(lastMove) {
    this.#renderPiece(null, lastMove.toField.row, lastMove.toField.column);
    this.#renderPiece(lastMove.pieceToMove, lastMove.fromField.row, lastMove.fromField.column);
    if (lastMove.attackedPiece !== null) {
      this.#renderPiece(lastMove.attackedPiece, lastMove.attackedField.row, lastMove.attackedField.column);
    }
  }

  clickOnEndButton() {
    this.chessboardView.toggleMoveButtons(false);
    this.#finishPlayerTurn();
    this.chessboardView.setGameInfoText(this.#getGameInfoString());
  }

  #getGameInfoString() {
    let currentPlayerHasMoves = false;
    this.chessboardModel.forEachField((field) => {
      if (field.piece !== null && field.piece.color === this.chessboardModel.currentPlayerColor) {
        if (this.chessboardModel.getPossibleMoves(field.row, field.column).size !== 0) {
          currentPlayerHasMoves = true;
          return false;
        }
      }
      return true;
    });

    if (!currentPlayerHasMoves) {
      if (this.chessboardModel.currentPlayerColor === PieceColor.WHITE) return "Игра окончена: чёрные победили";
      return "Игра окончена: белые победили";
    }

    if (this.chessboardModel.currentPlayerColor === PieceColor.WHITE) return "Ход белых";
    return "Ход чёрных";
  }

  #finishPlayerTurn() {
    this.#toggleSelectableFieldsForCurrentPlayer(false);
    this.chessboardModel.finishPlayerTurn();
    this.#toggleSelectableFieldsForCurrentPlayer(true);
  }

  #toggleSelectableFieldsForCurrentPlayer(enableSelectable) {
    this.chessboardModel.forEachField((field) => {
      if (field.piece !== null && field.piece.color === this.chessboardModel.currentPlayerColor) {
        this.chessboardView.setSelectableField(field.row, field.column, enableSelectable);
      }
      return true;
    });
  }

  /**
   * Toggles visual hints for specified field based on possible moves from it
   */
  #toggleHints(field, enableHints) {
    this.chessboardView.setFieldType(field.row, field.column, enableHints ? FieldType.SELECTED : FieldType.NONE);
    const moves = this.chessboardModel.getPossibleMoves(field.row, field.column);

    for (const [type, typedMoves] of moves) {
      const fieldType = type === MoveType.SILENT ? FieldType.SILENT_MOVE : FieldType.ATTACK_MOVE;
      for (const move of typedMoves) {
        this.chessboardView.setFieldType(
          move.toField.row,
          move.toField.column,
          enableHints ? fieldType : FieldType.NONE
        );
      }
    }
  }

  /**
   * @see {@link ChessboardModel.setBoard}
   * @param {string} FAN
   */
  setChessboard(FAN) {
    if (this.selectedField !== null) this.#disableHints(this.selectedField);
    this.#toggleSelectableFieldsForCurrentPlayer(false);
    this.chessboardView.setHistoryText(null);
    this.chessboardView.toggleMoveButtons(false);

    this.chessboardModel.setBoard(FAN);
    const board = this.chessboardModel.board;
    for (let row = 0; row < board.length; ++row) {
      for (let column = 0; column < board[0].length; ++column) {
        this.#renderPiece(board[row][column].piece, row, column);
      }
    }

    this.chessboardModel.currentPlayerColor = PieceColor.BLACK; // TODO: specify in FAN param whose turn it is now
    this.#toggleSelectableFieldsForCurrentPlayer(false);
    this.chessboardModel.currentPlayerColor = PieceColor.WHITE;
    this.#toggleSelectableFieldsForCurrentPlayer(true);

    this.chessboardView.setGameInfoText(this.#getGameInfoString());
  }

  #renderPiece(piece, row, column) {
    if (piece === null) this.chessboardView.setEmptyField(row, column);
    else if (piece instanceof Pawn) {
      if (piece.color === PieceColor.BLACK) this.chessboardView.setBlackPawn(row, column);
      else this.chessboardView.setWhitePawn(row, column);
    } else {
      if (piece.color === PieceColor.BLACK) this.chessboardView.setBlackQueen(row, column);
      else this.chessboardView.setWhiteQueen(row, column);
    }
  }

  copyMoveHistoryToClipboard() {
    const moveHistory = this.chessboardModel.moveHistory.convertToString();
    navigator.clipboard.writeText(moveHistory);
  }
}
