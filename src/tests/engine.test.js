import { Rules, ChessboardModel, Field, Pawn, PieceColor } from "../scripts/play/engine";

const rules = new Rules(false, true, true, true, false);
const chessboardModel = new ChessboardModel(rules);

test("Set default board", () => {
  chessboardModel.setBoard("-p-p-p-pp-p-p-p--p-p-p-p----------------P-P-P-P--P-P-P-PP-P-P-P-");

  const expected = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];

  for (let row = 0; row < 8; ++row) {
    for (let column = 0; column < 8; ++column) {
      if (expected[row][column] === 0) checkPawn(row, column, null);
      if (expected[row][column] === 1) checkPawn(row, column, PieceColor.BLACK);
      if (expected[row][column] === 2) checkPawn(row, column, PieceColor.WHITE);
    }
  }
});

const checkPawn = (row, column, color) => {
  const field = chessboardModel.board[row][column];
  expect(field).toBeInstanceOf(Field);
  expect(field.row).toStrictEqual(row);
  expect(field.column).toStrictEqual(column);
  expect(field.chessboardModel).toBe(chessboardModel);
  if (color === null) {
    expect(field.piece).toBeNull();
  } else {
    expect(field.piece).toBeInstanceOf(Pawn);
    expect(field.piece.field).toBe(field);
    expect(field.piece.color).toStrictEqual(color);
  }
};
