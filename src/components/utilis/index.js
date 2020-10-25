const createArray = n => {
  return Array.from({ length: n }, el => null);
}
const checkArr = arr => {
  return arr.every(el => el);
}
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerCoord: [a, b, c] };
    }
  }
  return null;
}

const playSound = (url) => {
  const audio = new Audio(url);
  audio.play();
}

const colorWinCells = (cells, winner) => {
  const $cells = document.querySelectorAll('.cell');
  cells.forEach((_, i ) => {
    if (winner.includes(i)) {
      $cells[i].classList.add('cell-win');
    }
  })
}
const clearColorWinCells = () => {
  const $cells = document.querySelectorAll('.cell-win');
 for (let i = 0; i < $cells.length; i++) {
   $cells[i].classList.remove('cell-win');
 }
}

const undoLastMove = (cells, index) => {
  return cells.filter((_, i) => i !== index);
}

const computerMove = (cells) => {
  const blankCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i]) blankCells.push(i);
  }
  return blankCells[Math.floor(Math.random() * blankCells.length)];
}

  export const utilis = {
    createArray: createArray,
    calculateWinner: calculateWinner,
    checkArr: checkArr,
    playSound: playSound,
    colorWinCells: colorWinCells,
    clearColorWinCells: clearColorWinCells,
    undoLastMove: undoLastMove,
    computerMove: computerMove,
}