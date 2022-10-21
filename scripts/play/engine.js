class Rules {
  constructor(canAttackMoveBackward, isAttackMandatory, firstPlayerIsWhite, canAttackChainMove) {
    this.canAttackMoveBackward = canAttackMoveBackward;
    this.isAttackMandatory = isAttackMandatory;
    this.firstPlayerIsWhite = firstPlayerIsWhite;
    this.canAttackChainMove = canAttackChainMove;
  }
}

class ChessboardModel {
  /**
   * @param {Rules} rules
   */
  constructor(rules) {
    this.rules = rules;
    this.board = [];
    for (let row = 0; row < 8; ++row) {
      this.board[row] = [];
      for (let column = 0; column < 8; ++column) {
        this.board[row].push(new Field(row, column, this));
      }
    }
    this.moveHistory = new MoveHistory();
    if (this.rules.firstPlayerIsWhite) this.firstPlayerColor = PieceColor.WHITE;
    else this.firstPlayerColor = PieceColor.BLACK;
    this.currentPlayerColor = this.firstPlayerColor;
  }

  /**
   * @param {Field} fromField
   * @param {Field} toField
   * @returns {Move?} move that was made or null if move is incorrect
   */
  tryMove(fromField, toField) {
    const move = this.#createMove(fromField, toField);
    if (move != null) return this.#makeMove(move);
    return null;
  }

  /**
   * Undo last move and returns it
   *
   * @returns {Move?} previous move or null if none
   */
  undoMove() {
    const lastMove = this.moveHistory.moves.pop();
    lastMove.toField.piece = null;
    lastMove.fromField.piece = lastMove.pieceToMove;
    lastMove.pieceToMove.field = lastMove.fromField;
    if (lastMove.attackedPiece != null) lastMove.attackedField.piece = lastMove.attackedPiece;
    return lastMove;
  }

  /**
   * @returns {boolean} true if current move is chain attack
   */
  isNowChainAttack() {
    const lastMove = this.moveHistory.moves[this.moveHistory.moves.length - 1];
    return lastMove != null && this.currentPlayerColor == lastMove.pieceToMove.color;
  }

  /**
   * @returns {Move?} a move or null if the move is incorrect
   */
  #createMove(fromField, toField) {
    const createdMove = new Move(fromField, toField);
    for (const [, moves] of this.getPossibleMoves(fromField.row, fromField.column)) {
      for (const move of moves) {
        if (move.toField == toField) {
          createdMove.attackedField = move.attackedField;
          createdMove.attackedPiece = move.attackedPiece;
          return createdMove;
        }
      }
    }
    return null;
  }

  #makeMove(move) {
    let piece = move.fromField.piece;
    piece.field = move.toField;
    if (piece instanceof Pawn) {
      if (piece.color == PieceColor.WHITE && move.toField.row == 0) piece = new Queen(move.toField, piece.color);
      if (piece.color == PieceColor.BLACK && move.toField.row == this.board[0].length - 1)
        piece = new Queen(move.toField, piece.color);
    }
    move.toField.piece = piece;

    move.fromField.piece = null;
    if (move.attackedPiece != null) move.attackedField.piece = null;

    this.moveHistory.moves.push(move);
    return move;
  }

  /**
   * '-' == empty field
   * 'p' == black pawn
   * 'P' == white pawn
   * 'q' == black queen
   * 'Q' == white queen
   *
   * @param {string} FAN notation of figure placement by rows. Starts from A8 to H1
   */
  setBoard(FAN) {
    if (FAN.length != this.board.length * this.board[0].length) {
      throw new Error(`FAN size (${FAN.length}) is not equal board size (64)`);
    }
    this.moveHistory = new MoveHistory();

    for (let i = 0; i < FAN.length; ++i) {
      const row = Math.floor(i / 8);
      const column = i % 8;
      switch (FAN[i]) {
        case "-":
          this.board[row][column].piece = null;
          break;
        case "p":
          this.board[row][column].piece = new Pawn(this.board[row][column], PieceColor.BLACK);
          break;
        case "P":
          this.board[row][column].piece = new Pawn(this.board[row][column], PieceColor.WHITE);
          break;
        case "q":
          this.board[row][column].piece = new Queen(this.board[row][column], PieceColor.BLACK);
          break;
        case "Q":
          this.board[row][column].piece = new Queen(this.board[row][column], PieceColor.WHITE);
          break;
        default:
          throw new Error(`Incorrect FAN. Unknown character: ${FAN[i]}`);
      }
    }
  }

  /**
   * @returns {Map<MoveType, Move[]>} allowed fields to move from specified position
   */
  getPossibleMoves(row, column) {
    const moves = this.#getPossibleMovesWithoutRules(row, column);

    if (this.isNowChainAttack()) {
      moves.delete(MoveType.SILENT);
      return moves;
    }

    if (this.rules.isAttackMandatory) {
      if (!moves.has(MoveType.SILENT)) return moves;
      this.forEachField((field) => {
        if (field.piece != null && field.piece.color == this.board[row][column].piece.color) {
          if (this.#getPossibleMovesWithoutRules(field.row, field.column).has(MoveType.ATTACK)) {
            moves.delete(MoveType.SILENT);
            return false;
          }
        }
        return true;
      });
    }

    return moves;
  }

  #getPossibleMovesWithoutRules(row, column) {
    return this.board[row][column].piece == null ? new Map() : this.board[row][column].piece.getPossibleMoves();
  }

  /**
   * @returns {Field?} field if its coords are correct
   */
  getField(row, column) {
    if (row >= 0 && row < this.board.length && column >= 0 && column < this.board[0].length)
      return this.board[row][column];
    return null;
  }

  /**
   * @param {(Field) => boolean} action if it returns false the iteration will stop
   */
  forEachField(action) {
    for (let row = 0; row < this.board.length; ++row) {
      for (let column = 0; column < this.board[0].length; ++column) {
        if (!action(this.board[row][column])) return;
      }
    }
  }
}

class Field {
  /**
   * @param {number} row
   * @param {number} column
   * @param {ChessboardModel} chessboardModel
   */
  constructor(row, column, chessboardModel) {
    this.row = row;
    this.column = column;
    this.chessboardModel = chessboardModel;
    this.piece = null;
  }
}

const MoveType = { SILENT: 0, ATTACK: 1 };
const PieceColor = { BLACK: 0, WHITE: 1 };

class Piece {
  /**
   * @param {Field} field
   * @param {PieceColor} color
   */
  constructor(field, color) {
    this.field = field;
    this.color = color;
  }

  getPossibleMoves() {
    return new Map();
  }
}

function addAllowedMove(allowedMoves, moveType, move) {
  let list = allowedMoves.get(moveType);
  if (list == null) allowedMoves.set(moveType, (list = []));
  list.push(move);
}

class Pawn extends Piece {
  getPossibleMoves() {
    const allowedMoves = new Map();
    const colorCoeff = this.color == PieceColor.BLACK ? 1 : -1;
    this.#tryAddAttackMove(colorCoeff, -1, allowedMoves);
    this.#tryAddAttackMove(colorCoeff, 1, allowedMoves);
    if (this.field.chessboardModel.rules.canAttackMoveBackward) {
      this.#tryAddAttackMove(-colorCoeff, -1, allowedMoves);
      this.#tryAddAttackMove(-colorCoeff, 1, allowedMoves);
    }
    if (allowedMoves.size == 0 || !this.field.chessboardModel.rules.isAttackMandatory) {
      this.#tryAddSilentMove(colorCoeff, -1, allowedMoves);
      this.#tryAddSilentMove(colorCoeff, 1, allowedMoves);
    }
    return allowedMoves;
  }

  #tryAddSilentMove(rowVector, columnVector, allowedMoves) {
    const toField = this.field.chessboardModel.getField(this.field.row + rowVector, this.field.column + columnVector);
    if (toField != null && toField.piece == null) {
      const move = new Move(this.field, toField);
      addAllowedMove(allowedMoves, MoveType.SILENT, move);
    }
  }

  #tryAddAttackMove(rowVector, columnVector, allowedMoves) {
    const attackedField = this.field.chessboardModel.getField(
      this.field.row + rowVector,
      this.field.column + columnVector
    );
    if (attackedField != null && attackedField.piece != null && attackedField.piece.color != this.color) {
      const toField = this.field.chessboardModel.getField(
        this.field.row + rowVector + rowVector,
        this.field.column + columnVector + columnVector
      );
      if (toField != null && toField.piece == null) {
        const move = new Move(this.field, toField);
        move.attackedField = attackedField;
        move.attackedPiece = attackedField.piece;
        addAllowedMove(allowedMoves, MoveType.ATTACK, move);
      }
    }
  }
}

class Queen extends Piece {
  getPossibleMoves() {
    const allowedMoves = new Map();
    this.#tryRayCastAndAddMoves(1, 1, allowedMoves);
    this.#tryRayCastAndAddMoves(1, -1, allowedMoves);
    this.#tryRayCastAndAddMoves(-1, 1, allowedMoves);
    this.#tryRayCastAndAddMoves(-1, -1, allowedMoves);
    if (this.field.chessboardModel.rules.isAttackMandatory && allowedMoves.has(MoveType.ATTACK)) {
      allowedMoves.delete(MoveType.SILENT);
    }
    return allowedMoves;
  }

  #tryRayCastAndAddMoves(rowVector, columnVector, allowedMoves) {
    let row = this.field.row + rowVector,
      column = this.field.column + columnVector;
    let toField = this.field.chessboardModel.getField(row, column);
    let move = new Move(this.field, toField);
    while (toField != null) {
      if (toField.piece != null) {
        if (move.attackedPiece != null || toField.piece.color == this.color) return;
        move.attackedField = toField;
        move.attackedPiece = toField.piece;
      } else {
        move.toField = toField;
        if (move.attackedPiece == null) addAllowedMove(allowedMoves, MoveType.SILENT, move);
        else addAllowedMove(allowedMoves, MoveType.ATTACK, move);
        const oldMove = move;
        move = new Move(this.field, toField);
        move.attackedField = oldMove.attackedField;
        move.attackedPiece = oldMove.attackedPiece;
      }
      row += rowVector;
      column += columnVector;
      toField = this.field.chessboardModel.getField(row, column);
    }
  }
}

class Move {
  /**
   * @param {Field} fromField
   * @param {Field} toField
   */
  constructor(fromField, toField) {
    this.pieceToMove = fromField.piece;
    this.fromField = fromField;
    this.toField = toField;
    this.attackedField = null;
    this.attackedPiece = null;
  }
}

class MoveHistory {
  constructor() {
    this.moves = new Array();
  }

  /**
   * @returns {string}
   */
  convertToString() {
    let historyString = "";
    let prevMove = this.moves[0];
    for (const move of this.moves) {
      let part = "";

      if (prevMove.toField != move.fromField) {
        if (move != this.moves[0]) part += " ";
        part += this.#fieldToString(move.fromField);
      }

      if (move.attackedPiece != null) part += ":";
      else part += "-";

      part += this.#fieldToString(move.toField);

      if (move.pieceToMove.color == PieceColor.WHITE) part = part.toUpperCase();

      historyString += part;
      prevMove = move;
    }
    return historyString;
  }

  /**
   * @param {Field} field
   * @returns {string}
   */
  #fieldToString(field) {
    return String.fromCharCode("a".charCodeAt(0) + field.column) + (8 - field.row);
  }
}
