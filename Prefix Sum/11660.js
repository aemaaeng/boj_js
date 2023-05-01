// 구간합 구하기 5
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

const P = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

// console.log(N, M);
// console.log(board);

// 누적합 만들기
for (let i = 1; i < P.length; i++) {
  for (let j = 1; j < P.length; j++) {
    P[i][j] = board[i - 1][j - 1] + P[i][j - 1] + P[i - 1][j] - P[i - 1][j - 1];
  }
}

// console.log(P);

// [
//   [ 0, 0, 0, 0, 0 ],
//   [ 0, 1, 3, 6, 10 ],
//   [ 0, 3, 8, 15, 24 ],
//   [ 0, 6, 15, 27, 42 ],
//   [ 0, 10, 24, 42, 64 ]
// ]

const answer = [];
const coords = input.slice(N + 1);
coords.forEach((coord) => {
  const [x1, y1, x2, y2] = coord.split(" ").map(Number);
  answer.push(P[x2][y2] - (P[x1 - 1][y2] + P[x2][y1 - 1]) + P[x1 - 1][y1 - 1]);
});

console.log(answer.join("\n"));
