// N-Queen
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString().trim());
const board = new Array(N).fill(0);

function promising(idx) {
  for (let i = 0; i < idx; i++) {
    if (board[idx] === board[i] || idx - i === Math.abs(board[idx] - board[i]))
      return 0;
  }
  return 1;
}

let count = 0;

function backtracking(cdx) {
  if (cdx === N) {
    count += 1;
    return;
  }

  for (let i = 0; i < N; i++) {
    board[cdx] = i;
    if (promising(cdx)) backtracking(cdx + 1);
  }
}

backtracking(0);
console.log(count);
