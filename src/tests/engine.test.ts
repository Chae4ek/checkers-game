import { Rules, ChessboardModel, Field, Pawn, PieceColor, MoveType, Move } from "../scripts/play/engine";

const rules = new Rules(false, true, true, true, false);
const chessboardModel = new ChessboardModel(rules);

const setBoard = (FAN: string) => {
  chessboardModel.setBoard(FAN.replace(/[ \n\t]/g, ""));
};

test("Set default board", () => {
  const checkPawn = (row: number, column: number, color: PieceColor | null) => {
    const field = chessboardModel.board[row][column];
    expect(field).toBeInstanceOf(Field);
    expect(field.row).toStrictEqual(row);
    expect(field.column).toStrictEqual(column);
    expect(field.chessboardModel).toBe(chessboardModel);
    if (color === null) {
      expect(field.piece).toBeNull();
    } else {
      expect(field.piece).not.toBeNull();
      expect(field.piece).toBeInstanceOf(Pawn);
      expect(field.piece!.field).toBe(field);
      expect(field.piece!.color).toStrictEqual(color);
    }
  };

  setBoard(`
  -p-p-p-p
  p-p-p-p-
  -p-p-p-p
  --------
  --------
  P-P-P-P-
  -P-P-P-P
  P-P-P-P-
  `);

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

const checkMoves = (expectedMoves: Map<MoveType, Move[]>, moves: Map<MoveType, Move[]>) => {
  const checkMovesOf = (moveType: MoveType) => {
    expect(moves.has(moveType)).toBeTruthy();
    const typedExpectedMoves = expectedMoves.get(moveType);
    const typedMoves = moves.get(moveType);

    expect(typedMoves!.length).toStrictEqual(typedExpectedMoves!.length);

    typedExpectedMoves!.forEach((expectedMove) => {
      const expectedRow = expectedMove.toField.row;
      const expectedColumn = expectedMove.toField.column;
      const isFound =
        undefined !==
        typedMoves!.find((move) => move.toField.row === expectedRow && move.toField.column === expectedColumn);
      expect(isFound).toBeTruthy();
    });
  };

  expect(moves.size).toStrictEqual(expectedMoves.size);
  if (expectedMoves.has(MoveType.SILENT)) checkMovesOf(MoveType.SILENT);
  if (expectedMoves.has(MoveType.ATTACK)) checkMovesOf(MoveType.ATTACK);
};

const makeMoveMap = (
  silentPositions: { row: number; column: number }[],
  attackPositions: { row: number; column: number }[]
) => {
  const moves = new Map<MoveType, Move[]>();
  const silentMoves: Move[] = [];
  const attackMoves: Move[] = [];
  const nullField = new Field(0, 0, chessboardModel);
  silentPositions.forEach(({ row, column }) =>
    silentMoves.push(new Move(nullField, new Field(row, column, chessboardModel)))
  );
  attackPositions.forEach(({ row, column }) =>
    attackMoves.push(new Move(nullField, new Field(row, column, chessboardModel)))
  );
  if (silentMoves.length !== 0) moves.set(MoveType.SILENT, silentMoves);
  if (attackMoves.length !== 0) moves.set(MoveType.ATTACK, attackMoves);
  return moves;
};

test("Check pawn attack moves", () => {
  setBoard(`
  -p-p-p-p
  P---P-P-
  --------
  --p-----
  -----P--
  --------
  -p-p---p
  P-P-P-P-
  `);

  checkMoves(makeMoveMap([], []), chessboardModel.getPossibleMoves(3, 2));
  checkMoves(makeMoveMap([], []), chessboardModel.getPossibleMoves(4, 5));
  checkMoves(makeMoveMap([], [{ row: 2, column: 5 }]), chessboardModel.getPossibleMoves(0, 3));
  checkMoves(
    makeMoveMap(
      [],
      [
        { row: 2, column: 3 },
        { row: 2, column: 7 },
      ]
    ),
    chessboardModel.getPossibleMoves(0, 5)
  );
  checkMoves(makeMoveMap([], [{ row: 2, column: 5 }]), chessboardModel.getPossibleMoves(0, 7));
  checkMoves(makeMoveMap([], [{ row: 5, column: 2 }]), chessboardModel.getPossibleMoves(7, 0));
  checkMoves(
    makeMoveMap(
      [],
      [
        { row: 5, column: 0 },
        { row: 5, column: 4 },
      ]
    ),
    chessboardModel.getPossibleMoves(7, 2)
  );
  checkMoves(makeMoveMap([], [{ row: 5, column: 2 }]), chessboardModel.getPossibleMoves(7, 4));
  checkMoves(makeMoveMap([], []), chessboardModel.getPossibleMoves(7, 6));
});

test("Check queen attack moves", () => {
  setBoard(`
  --------
  --------
  --------
  --q-----
  --------
  ----Q---
  --------
  --------
  `);

  checkMoves(
    makeMoveMap(
      [],
      [
        { row: 6, column: 5 },
        { row: 7, column: 6 },
      ]
    ),
    chessboardModel.getPossibleMoves(3, 2)
  );
  checkMoves(
    makeMoveMap(
      [],
      [
        { row: 1, column: 0 },
        { row: 2, column: 1 },
      ]
    ),
    chessboardModel.getPossibleMoves(5, 4)
  );
});

test("Check pawn silent moves", () => {
  setBoard(`
  --------
  --------
  --------
  --p-----
  --------
  ----P---
  --------
  --------
  `);

  checkMoves(
    makeMoveMap(
      [
        { row: 4, column: 1 },
        { row: 4, column: 3 },
      ],
      []
    ),
    chessboardModel.getPossibleMoves(3, 2)
  );
  checkMoves(
    makeMoveMap(
      [
        { row: 4, column: 3 },
        { row: 4, column: 5 },
      ],
      []
    ),
    chessboardModel.getPossibleMoves(5, 4)
  );
});

test("Check queen silent moves", () => {
  setBoard(`
  --------
  --------
  --------
  --q-----
  -----Q--
  --------
  --------
  --------
  `);

  checkMoves(
    makeMoveMap(
      [
        { row: 1, column: 0 },
        { row: 2, column: 1 },
        { row: 4, column: 3 },
        { row: 5, column: 4 },
        { row: 6, column: 5 },
        { row: 7, column: 6 },

        { row: 0, column: 5 },
        { row: 1, column: 4 },
        { row: 2, column: 3 },
        { row: 4, column: 1 },
        { row: 5, column: 0 },
      ],
      []
    ),
    chessboardModel.getPossibleMoves(3, 2)
  );
  checkMoves(
    makeMoveMap(
      [
        { row: 0, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 3 },
        { row: 3, column: 4 },
        { row: 5, column: 6 },
        { row: 6, column: 7 },

        { row: 2, column: 7 },
        { row: 3, column: 6 },
        { row: 5, column: 4 },
        { row: 6, column: 3 },
        { row: 7, column: 2 },
      ],
      []
    ),
    chessboardModel.getPossibleMoves(4, 5)
  );
});
