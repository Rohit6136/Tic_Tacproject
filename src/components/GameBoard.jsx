export const GameBoard = ({ onSelectSquare, board }) => (
  <ol id="game-board">
    {board.map((row, rowind) => (
      <li key={rowind}>
        <ol>
          {row.map((playerSymbol, colind) => (
            <li key={colind}>
              <button
                onClick={() => onSelectSquare(rowind, colind)}
                disabled={playerSymbol !== null ? true : false}
              >
                {playerSymbol}
              </button>
            </li>
          ))}
        </ol>
      </li>
    ))}
  </ol>
);

