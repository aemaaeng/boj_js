const fs = require("fs");
// TODO: 제출 시 경로 변환 필수 ("/dev/stdin")
const input = fs.readFileSync("test.txt").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 표의 크기
const M = Number(input[0].split(" ")[1]); // 합을 구해야 하는 횟수

const board = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));

// 누적합 배열
let P = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));

for (let i = 1; i < P.length; i++) {
  for (let j = 1; j < P.length; j++) {
    // P[0][1] =
    P[i][j] = board[i - 1][j - 1] + P[i][j - 1] + P[i - 1][j] - P[i - 1][j - 1];
  }
}

// 이제 구하면 됨
let answer = [];
for (let i = N + 1; i < input.length; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
  answer.push(P[x2][y2] - (P[x1 - 1][y2] + P[x2][y1 - 1]) + P[x1 - 1][y1 - 1]);
}
console.log(answer.join("\n"));
