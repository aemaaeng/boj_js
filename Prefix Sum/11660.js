// 구간합 구하기 5
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

const P = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

for (let i = 1; i < P.length; i++) {
  for (let j = 1; j < P.length; j++) {
    P[i][j] = board[i - 1][j - 1] + P[i][j - 1] + P[i - 1][j] - P[i - 1][j - 1];
  }
}

const coords = input.slice(N + 1).map((el) => el.split(" ").map(Number));
const answer = [];

coords.forEach((el) => {
  const [x1, y1, x2, y2] = el;
  answer.push(P[x2][y2] - (P[x1 - 1][y2] + P[x2][y1 - 1]) + P[x1 - 1][y1 - 1]);
});

console.log(answer.join("\n"));
