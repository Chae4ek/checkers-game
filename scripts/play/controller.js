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
    this.isChainMove = false;
  }

  /**
   * Calls when mouse clicks on field at (row, column) position
   */
  clickOnFieldEvent(row, column) {
    if (!this.chessboardView.isSelectableField(row, column)) return;

    const currentField = this.chessboardModel.getField(row, column);
    if (this.selectedField == currentField) {
      this.selectedField = null;
      this.#toggleHints(currentField, false);
      if (this.isChainMove) {
        this.chessboardView.setSelectableField(currentField.row, currentField.column, true);
      } else {
        this.#toggleAllSelectableFields(true);
      }
    } else {
      if (this.selectedField == null) {
        this.#toggleAllSelectableFields(false);
        this.selectedField = currentField;
        this.#toggleHints(this.selectedField, true);
      } else {
        this.#toggleHints(this.selectedField, false);
        this.#makeMove(this.selectedField, currentField);
      }
    }
  }

  clickOnCancelButton() {
    if (this.isChainMove) {
      if (this.selectedField != null) {
        this.#toggleHints(this.selectedField, false);
        this.selectedField = null;
      }
    }
    const lastMove = this.chessboardModel.undoMove();
    this.#renderPiece(null, lastMove.toField.row, lastMove.toField.column);
    this.#renderPiece(lastMove.pieceToMove, lastMove.fromField.row, lastMove.fromField.column);
    if (lastMove.attackedPiece != null) {
      this.#renderPiece(lastMove.attackedPiece, lastMove.attackedField.row, lastMove.attackedField.column);
    }

    if (this.chessboardModel.isNowChainAttack()) {
      this.isChainMove = true;
      this.selectedField = lastMove.fromField;
      this.#toggleHints(this.selectedField, true);
    } else {
      this.isChainMove = false;
      this.chessboardView.toggleMoveButtons(false);
      this.#toggleAllSelectableFields(true);
    }

    if (this.isChainMove && this.chessboardModel.rules.isAttackMandatory) {
      // TODO(?): add rule whether you can interrupt chain move
      this.chessboardView.toggleEndButton(false);
    }
  }

  clickOnEndButton() {
    this.chessboardView.toggleMoveButtons(false);
    this.#toggleCurrentPlayer();
    // TODO: check the end of game (condition)
  }

  /**
   * @param {Field} fromField
   * @param {Field} toField
   */
  #makeMove(fromField, toField) {
    const move = this.chessboardModel.tryMove(fromField, toField);
    if (move == null) return;
    this.#renderMove(move);

    this.isChainMove = false;
    if (move.attackedPiece != null && this.chessboardModel.rules.canAttackChainMove) {
      const movesFromDestination = this.chessboardModel.getPossibleMoves(move.toField.row, move.toField.column);
      if (movesFromDestination.has(MoveType.ATTACK)) {
        this.isChainMove = true;
        this.selectedField = toField;
        this.#toggleHints(this.selectedField, true);

        this.chessboardView.toggleCancelButton(true);
        if (!this.chessboardModel.rules.isAttackMandatory) {
          // TODO(?): add rule whether you can interrupt chain move
          this.chessboardView.toggleEndButton(true);
        }
      } else {
        this.#endMove();
      }
    } else {
      this.#endMove();
    }
  }

  #endMove() {
    this.chessboardView.toggleMoveButtons(true);
    this.selectedField = null;
  }

  #renderMove(move) {
    this.#renderPiece(null, move.fromField.row, move.fromField.column);
    this.#renderPiece(move.toField.piece, move.toField.row, move.toField.column);
    if (move.attackedPiece != null) {
      this.#renderPiece(null, move.attackedField.row, move.attackedField.column);
    }
  }

  #toggleAllSelectableFields(enableSelectable) {
    this.chessboardModel.forEachField((field) => {
      if (field.piece != null && field.piece.color == this.chessboardModel.currentPlayerColor) {
        this.chessboardView.setSelectableField(field.row, field.column, enableSelectable);
      }
      return true;
    });
  }

  #toggleCurrentPlayer() {
    // TODO: move to engine logic
    this.#toggleSelectableFieldsForCurrentPlayer();
    if (this.chessboardModel.currentPlayerColor == PieceColor.WHITE)
      this.chessboardModel.currentPlayerColor = PieceColor.BLACK;
    else this.chessboardModel.currentPlayerColor = PieceColor.WHITE;
  }

  #toggleSelectableFieldsForCurrentPlayer() {
    this.chessboardModel.forEachField((field) => {
      if (field.piece != null) {
        if (field.piece.color == this.chessboardModel.currentPlayerColor) {
          this.chessboardView.setSelectableField(field.row, field.column, false);
        } else {
          this.chessboardView.setSelectableField(field.row, field.column, true);
        }
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
    moves.get(MoveType.SILENT)?.forEach((move) => {
      this.chessboardView.setFieldType(
        move.toField.row,
        move.toField.column,
        enableHints ? FieldType.SILENT_MOVE : FieldType.NONE
      );
    });
    moves.get(MoveType.ATTACK)?.forEach((move) => {
      this.chessboardView.setFieldType(
        move.toField.row,
        move.toField.column,
        enableHints ? FieldType.ATTACK_MOVE : FieldType.NONE
      );
    });
  }

  /**
   * @see {@link ChessboardModel.setBoard}
   * @param {string} FAN
   */
  setChessboard(FAN) {
    if (this.selectedField != null) {
      this.#toggleHints(this.selectedField, false);
      this.selectedField = null;
    }
    this.isChainMove = false;
    this.chessboardView.toggleMoveButtons(false);
    this.#toggleAllSelectableFields(false);
    this.chessboardModel.setBoard(FAN);

    const board = this.chessboardModel.board;
    for (let row = 0; row < board.length; ++row) {
      for (let column = 0; column < board[0].length; ++column) {
        this.#renderPiece(board[row][column].piece, row, column);
      }
    }

    this.chessboardModel.currentPlayerColor = PieceColor.BLACK; // TODO: specify in FAN param whose turn it is now
    this.#toggleCurrentPlayer();
  }

  #renderPiece(piece, row, column) {
    if (piece == null) this.chessboardView.setEmptyField(row, column);
    else if (piece instanceof Pawn) {
      if (piece.color == PieceColor.BLACK) this.chessboardView.setBlackPawn(row, column);
      else this.chessboardView.setWhitePawn(row, column);
    } else if (piece instanceof Queen) {
      if (piece.color == PieceColor.BLACK) this.chessboardView.setBlackQueen(row, column);
      else this.chessboardView.setWhiteQueen(row, column);
    } else throw new Error(`Unknown field code: ${piece}`);
  }

  copyMoveHistoryToClipboard() {
    const moveHistory = this.chessboardModel.moveHistory.convertToString();
    navigator.clipboard.writeText(moveHistory);
  }
}
