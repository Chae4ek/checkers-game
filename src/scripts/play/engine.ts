export class Rules {
  canAttackMoveBackward: boolean;
  isAttackMandatory: boolean;
  firstPlayerIsWhite: boolean;
  canAttackChainMove: boolean;
  canInterruptChainMove: boolean;

  /**
   * @param canAttackMoveBackward whether a simple piece can make an attacking move backwards
   * @param isAttackMandatory whether an attack move is mandatory
   * @param firstPlayerIsWhite whether the first player is white, else is black
   * @param canAttackChainMove whether chain move is allowed, else only simple moves even if a chain move is possible
   * @param canInterruptChainMove whether you can finish your turn in the middle of a chain move
   */
  constructor(
    canAttackMoveBackward: boolean,
    isAttackMandatory: boolean,
    firstPlayerIsWhite: boolean,
    canAttackChainMove: boolean,
    canInterruptChainMove: boolean
  ) {
    this.canAttackMoveBackward = canAttackMoveBackward;
    this.isAttackMandatory = isAttackMandatory;
    this.firstPlayerIsWhite = firstPlayerIsWhite;
    this.canAttackChainMove = canAttackChainMove;
    this.canInterruptChainMove = canInterruptChainMove;
  }
}

export class ChessboardModel {
  rules: Rules;
  board: Field[][];
  moveHistory: MoveHistory;
  firstPlayerColor: PieceColor;
  currentPlayerColor: PieceColor;

  constructor(rules: Rules) {
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
   * @returns move that was made or null if move is incorrect
   */
  tryMove(fromField: Field, toField: Field): Move | null {
    const move = this.#createMove(fromField, toField);
    if (move !== null) this.#makeMove(move);
    return move;
  }

  finishPlayerTurn() {
    if (this.currentPlayerColor === PieceColor.WHITE) this.currentPlayerColor = PieceColor.BLACK;
    else this.currentPlayerColor = PieceColor.WHITE;
  }

  /**
   * Undo last move and returns it
   *
   * @returns previous move or null if none
   */
  undoMove(): Move | null {
    const lastMove = this.moveHistory.moves.pop();
    if (lastMove === undefined) return null;
    lastMove.toField.piece = null;
    lastMove.fromField.piece = lastMove.pieceToMove;
    lastMove.pieceToMove.field = lastMove.fromField;
    if (lastMove.attackedField !== null) lastMove.attackedField.piece = lastMove.attackedPiece;
    return lastMove;
  }

  /**
   * @returns true if current move is chain attack
   */
  isNowChainAttack(): boolean {
    if (!this.rules.canAttackChainMove) return false;
    const lastMove = this.moveHistory.moves[this.moveHistory.moves.length - 1];
    return lastMove !== undefined && this.currentPlayerColor === lastMove.pieceToMove.color;
  }

  /**
   * @returns a move or null if the move is incorrect
   */
  #createMove(fromField: Field, toField: Field): Move | null {
    const createdMove = new Move(fromField, toField);
    for (const [, moves] of this.getPossibleMoves(fromField.row, fromField.column)) {
      for (const move of moves) {
        if (move.toField === toField) {
          createdMove.attackedField = move.attackedField;
          createdMove.attackedPiece = move.attackedPiece;
          return createdMove;
        }
      }
    }
    return null;
  }

  #makeMove(move: Move) {
    let piece = move.fromField.piece!;
    piece.field = move.toField;
    if (piece instanceof Pawn) {
      if (piece.color === PieceColor.WHITE && move.toField.row === 0) piece = new Queen(move.toField, piece.color);
      if (piece.color === PieceColor.BLACK && move.toField.row === this.board[0].length - 1)
        piece = new Queen(move.toField, piece.color);
    }
    move.toField.piece = piece;

    move.fromField.piece = null;
    if (move.attackedField !== null) move.attackedField.piece = null;

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
   * @param FAN notation of figure placement by rows. Starts from A8 to H1
   */
  setBoard(FAN: string) {
    if (FAN.length !== this.board.length * this.board[0].length) {
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
   * @returns allowed fields to move from specified position
   */
  getPossibleMoves(row: number, column: number): Map<MoveType, Move[]> {
    const moves = this.#getPossibleMovesWithoutMandatoryAttackRule(row, column);

    if (this.isNowChainAttack()) {
      moves.delete(MoveType.SILENT);
      return moves;
    }

    if (this.rules.isAttackMandatory) {
      if (!moves.has(MoveType.SILENT)) return moves;

      const piece = this.board[row][column].piece;
      if (piece === null) return moves;

      this.forEachField((field) => {
        if (field.piece !== null && field.piece.color === piece.color) {
          if (this.#getPossibleMovesWithoutMandatoryAttackRule(field.row, field.column).has(MoveType.ATTACK)) {
            moves.delete(MoveType.SILENT);
            return false;
          }
        }
        return true;
      });
    }

    return moves;
  }

  #getPossibleMovesWithoutMandatoryAttackRule(row: number, column: number): Map<MoveType, Move[]> {
    const piece = this.board[row][column].piece;
    return piece === null ? new Map() : piece.getPossibleMoves();
  }

  /**
   * @returns field if its coords are correct
   */
  getField(row: number, column: number): Field | null {
    if (row >= 0 && row < this.board.length && column >= 0 && column < this.board[0].length)
      return this.board[row][column];
    return null;
  }

  /**
   * @param action if it returns false the iteration will stop
   */
  forEachField(action: (field: Field) => boolean) {
    for (let row = 0; row < this.board.length; ++row) {
      for (let column = 0; column < this.board[0].length; ++column) {
        if (!action(this.board[row][column])) return;
      }
    }
  }
}

export class Field {
  row: number;
  column: number;
  chessboardModel: ChessboardModel;
  piece: Piece | null = null;

  constructor(row: number, column: number, chessboardModel: ChessboardModel) {
    this.row = row;
    this.column = column;
    this.chessboardModel = chessboardModel;
  }
}

export enum MoveType {
  SILENT,
  ATTACK,
}

export enum PieceColor {
  BLACK,
  WHITE,
}

export class Piece {
  field: Field;
  color: PieceColor;

  constructor(field: Field, color: PieceColor) {
    this.field = field;
    this.color = color;
  }

  getPossibleMoves(): Map<MoveType, Move[]> {
    return new Map();
  }
}

const addAllowedMove = (allowedMoves: Map<MoveType, Move[]>, moveType: MoveType, move: Move) => {
  let list = allowedMoves.get(moveType);
  if (list === undefined) allowedMoves.set(moveType, (list = []));
  list.push(move);
};

export class Pawn extends Piece {
  getPossibleMoves(): Map<MoveType, Move[]> {
    const allowedMoves = new Map();
    const colorCoeff = this.color === PieceColor.BLACK ? 1 : -1;
    this.#tryAddAttackMove(colorCoeff, -1, allowedMoves);
    this.#tryAddAttackMove(colorCoeff, 1, allowedMoves);
    if (this.field.chessboardModel.rules.canAttackMoveBackward) {
      this.#tryAddAttackMove(-colorCoeff, -1, allowedMoves);
      this.#tryAddAttackMove(-colorCoeff, 1, allowedMoves);
    }
    if (allowedMoves.size === 0 || !this.field.chessboardModel.rules.isAttackMandatory) {
      this.#tryAddSilentMove(colorCoeff, -1, allowedMoves);
      this.#tryAddSilentMove(colorCoeff, 1, allowedMoves);
    }
    return allowedMoves;
  }

  #tryAddSilentMove(rowVector: number, columnVector: number, allowedMoves: Map<MoveType, Move[]>) {
    const toField = this.field.chessboardModel.getField(this.field.row + rowVector, this.field.column + columnVector);
    if (toField !== null && toField.piece === null) {
      const move = new Move(this.field, toField);
      addAllowedMove(allowedMoves, MoveType.SILENT, move);
    }
  }

  #tryAddAttackMove(rowVector: number, columnVector: number, allowedMoves: Map<MoveType, Move[]>) {
    const attackedField = this.field.chessboardModel.getField(
      this.field.row + rowVector,
      this.field.column + columnVector
    );
    if (attackedField !== null && attackedField.piece !== null && attackedField.piece.color !== this.color) {
      const toField = this.field.chessboardModel.getField(
        this.field.row + rowVector + rowVector,
        this.field.column + columnVector + columnVector
      );
      if (toField !== null && toField.piece === null) {
        const move = new Move(this.field, toField);
        move.attackedField = attackedField;
        move.attackedPiece = attackedField.piece;
        addAllowedMove(allowedMoves, MoveType.ATTACK, move);
      }
    }
  }
}

export class Queen extends Piece {
  getPossibleMoves(): Map<MoveType, Move[]> {
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

  #tryRayCastAndAddMoves(rowVector: number, columnVector: number, allowedMoves: Map<MoveType, Move[]>) {
    let row = this.field.row + rowVector,
      column = this.field.column + columnVector;
    let toField = this.field.chessboardModel.getField(row, column);
    let move = new Move(this.field, toField!);
    while (toField !== null) {
      if (toField.piece !== null) {
        if (move.attackedPiece !== null || toField.piece.color === this.color) return;
        move.attackedField = toField;
        move.attackedPiece = toField.piece;
      } else {
        move.toField = toField;
        if (move.attackedPiece === null) addAllowedMove(allowedMoves, MoveType.SILENT, move);
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

export class Move {
  pieceToMove: Piece;
  fromField: Field;
  toField: Field;
  attackedField: Field | null = null;
  attackedPiece: Piece | null = null;

  constructor(fromField: Field, toField: Field) {
    this.pieceToMove = fromField.piece!;
    this.fromField = fromField;
    this.toField = toField;
  }
}

export class MoveHistory {
  moves: Move[] = [];

  convertToString(): string {
    let historyString = "";
    let prevMove = this.moves[0];
    for (const move of this.moves) {
      let part = "";

      if (prevMove.toField !== move.fromField) {
        if (move !== this.moves[0]) part += " ";
        part += this.#fieldToString(move.fromField);
      }

      if (move.attackedPiece !== null) part += ":";
      else part += "-";

      part += this.#fieldToString(move.toField);

      if (move.pieceToMove.color === PieceColor.WHITE) part = part.toUpperCase();

      historyString += part;
      prevMove = move;
    }
    return historyString;
  }

  #fieldToString(field: Field): string {
    return String.fromCharCode("a".charCodeAt(0) + field.column) + (8 - field.row);
  }
}
