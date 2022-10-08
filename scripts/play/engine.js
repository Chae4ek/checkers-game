class Rules {

  constructor(canAttackMoveBackward, isAttackMandatory) {
    this.canAttackMoveBackward = canAttackMoveBackward
    this.isAttackMandatory = isAttackMandatory
  }
}

class ChessboardModel {

  /**
   * @param {Rules} rules
   */
  constructor(rules) {
    this.rules = rules
    this.board = []
    for (let row = 0; row < 8; ++row) {
      this.board[row] = []
      for (let column = 0; column < 8; ++column) {
        this.board[row].push(new Field(row, column, this))
      }
    }
  }

  /**
   * @returns {MoveHistory}
   */
  getMoveHistory() {
    // TODO
    return new MoveHistory()
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
      throw new Error(`FAN size (${FAN.length}) is not equal board size (64)`)
    }

    for (let i = 0; i < FAN.length; ++i) {
      const row = Math.floor(i / 8)
      const column = i % 8
      switch (FAN[i]) {
        case '-':
          this.board[row][column].piece = null
          break;
        case 'p':
          this.board[row][column].piece = new Pawn(this.board[row][column], PieceColor.BLACK)
          break;
        case 'P':
          this.board[row][column].piece = new Pawn(this.board[row][column], PieceColor.WHITE)
          break;
        case 'q':
          this.board[row][column].piece = new Queen(this.board[row][column], PieceColor.BLACK)
          break;
        case 'Q':
          this.board[row][column].piece = new Queen(this.board[row][column], PieceColor.WHITE)
          break;
        default:
          throw new Error(`Incorrect FAN. Unknown character: ${FAN[i]}`)
      }
    }
  }

  /**
   * @returns {Map<MoveType, Field[]>} allowed fields to move from specified position
   */
  getPossibleMoves(row, column) {
    const moves = this.#getPossibleMovesWithoutRules(row, column)

    if (this.rules.isAttackMandatory) {
      if (moves.has(MoveType.ATTACK) || !moves.has(MoveType.SILENT)) return moves
      this.forEachField((field) => {
        if (field.piece != null && field.piece.color == this.board[row][column].piece.color) {
          if (this.#getPossibleMovesWithoutRules(field.row, field.column).has(MoveType.ATTACK)) {
            moves.delete(MoveType.SILENT)
            return false
          }
        }
        return true
      })
    }

    return moves
  }

  #getPossibleMovesWithoutRules(row, column) {
    return this.board[row][column].piece == null ? new Map() : this.board[row][column].piece.getPossibleMoves()
  }

  getField(row, column) {
    if (row >= 0 && row < this.board.length && column >= 0 && column < this.board[0].length) return this.board[row][column]
    return null
  }

  /**
   * @param {(Field) => boolean} action if it returns false the iteration will stop
   */
  forEachField(action) {
    for (let row = 0; row < this.board.length; ++row) {
      for (let column = 0; column < this.board[0].length; ++column) {
        if (!action(this.board[row][column])) return
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
    this.row = row
    this.column = column
    this.chessboardModel = chessboardModel
    this.piece = null
  }
}

const MoveType = { SILENT: 0, ATTACK: 1 }
const PieceColor = { BLACK: 0, WHITE: 1 }

class Piece {

  /**
   * @param {Field} field
   * @param {PieceColor} color
   */
  constructor(field, color) {
    this.field = field
    this.color = color
  }

  getPossibleMoves() {
    return new Map()
  }
}

function addAllowedMove(allowedMoves, moveType, move) {
  let list = allowedMoves.get(moveType)
  if (list == null) allowedMoves.set(moveType, list = [])
  list.push(move)
}

class Pawn extends Piece {

  getPossibleMoves() {
    const allowedMoves = new Map()
    const colorCoeff = this.color == PieceColor.BLACK ? 1 : -1
    this.#tryAddAttackMove(colorCoeff, -1, allowedMoves)
    this.#tryAddAttackMove(colorCoeff, 1, allowedMoves)
    if (this.field.chessboardModel.rules.canAttackMoveBackward) {
      this.#tryAddAttackMove(-colorCoeff, -1, allowedMoves)
      this.#tryAddAttackMove(-colorCoeff, 1, allowedMoves)
    }
    if (allowedMoves.size == 0 || !this.field.chessboardModel.rules.isAttackMandatory) {
      this.#tryAddSilentMove(colorCoeff, -1, allowedMoves)
      this.#tryAddSilentMove(colorCoeff, 1, allowedMoves)
    }
    return allowedMoves
  }

  #tryAddSilentMove(rowVector, columnVector, allowedMoves) {
    const move = this.field.chessboardModel.getField(this.field.row + rowVector, this.field.column + columnVector)
    if (move != null && move.piece == null) addAllowedMove(allowedMoves, MoveType.SILENT, move)
  }

  #tryAddAttackMove(rowVector, columnVector, allowedMoves) {
    let move = this.field.chessboardModel.getField(this.field.row + rowVector, this.field.column + columnVector)
    if (move != null && move.piece != null && move.piece.color != this.color) {
      move = this.field.chessboardModel.getField(this.field.row + rowVector + rowVector, this.field.column + columnVector + columnVector)
      if (move != null && move.piece == null) addAllowedMove(allowedMoves, MoveType.ATTACK, move)
    }
  }
}

class Queen extends Piece {

  getPossibleMoves() {
    const allowedMoves = new Map()
    this.#tryRayCastAndAddMoves(1, 1, allowedMoves)
    this.#tryRayCastAndAddMoves(1, -1, allowedMoves)
    this.#tryRayCastAndAddMoves(-1, 1, allowedMoves)
    this.#tryRayCastAndAddMoves(-1, -1, allowedMoves)
    if (this.field.chessboardModel.rules.isAttackMandatory && allowedMoves.has(MoveType.ATTACK)) {
      allowedMoves.delete(MoveType.SILENT)
    }
    return allowedMoves
  }

  #tryRayCastAndAddMoves(rowVector, columnVector, allowedMoves) {
    let row = this.field.row + rowVector, column = this.field.column + columnVector
    let move = this.field.chessboardModel.getField(row, column)
    let addSilentMove = true
    while (move != null) {
      if (move.piece != null) {
        if (!addSilentMove || move.piece.color == this.color) return
        addSilentMove = false
      }
      else {
        if (addSilentMove) addAllowedMove(allowedMoves, MoveType.SILENT, move)
        else addAllowedMove(allowedMoves, MoveType.ATTACK, move)
      }
      row += rowVector
      column += columnVector
      move = this.field.chessboardModel.getField(row, column)
    }
  }
}

class MoveHistory {

  /**
   * @returns {string}
   */
  convertToString() {
    // TODO
    return "TODO: return move history string"
  }
}
