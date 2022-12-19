// 체스판 다시 칠하기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]);
const M = Number(input[0].split(" ")[1]);
const board = input.slice(1);
const cnt = [];

for (let i = 0; i < N - 7; i++) {
  for (let j = 0; j < M - 7; j++) {
    let idx1 = 0;
    let idx2 = 0;
    for (let x = i; x < i + 8; x++) {
      for (let y = j; y < j + 8; y++) {
        if ((x + y) % 2 === 0) {
          if (board[x][y] !== "W") idx1 += 1;
          if (board[x][y] !== "B") idx2 += 1;
        } else {
          if (board[x][y] !== "B") idx1 += 1;
          if (board[x][y] !== "W") idx2 += 1;
        }
      }
    }
    cnt.push(Math.min(idx1, idx2));
  }
}

console.log(Math.min(...cnt));
