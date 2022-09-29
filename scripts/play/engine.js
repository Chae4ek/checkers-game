class ChessboardModel {

  /**
   * 0 - empty field
   * 1 - black pawn
   * 2 - white pawn
   * 3 - black queen
   * 4 - white queen
   */
  board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]

  /**
   * '-' == 0 (empty field)
   * 'p' == 1 (black pawn)
   * 'P' == 2 (white pawn)
   * 'q' == 3 (black queen)
   * 'Q' == 4 (white queen)
   * 
   * @param {string} FAN notation of figure placement by rows. Starts from A8 to H1
   */
  setBoard(FAN) {
    if (FAN.length != this.board.length * this.board[0].length) {
      throw new Error('FAN size (' + FAN.length + ') is not equal board size (64)')
    }

    for (let i = 0; i < FAN.length; ++i) {
      const row = Math.floor(i / 8)
      const column = i % 8
      switch (FAN[i]) {
        case '-':
          this.board[row][column] = 0
          break;
        case 'p':
          this.board[row][column] = 1
          break;
        case 'P':
          this.board[row][column] = 2
          break;
        case 'q':
          this.board[row][column] = 3
          break;
        case 'Q':
          this.board[row][column] = 4
          break;
        default:
          throw new Error('Incorrect FAN. Unknown character: ' + FAN[i])
      }
    }
  }
}
