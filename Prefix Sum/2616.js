// 소형기관차
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const limit = Number(input[2]);

const P = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  P[i] = P[i - 1] + A[i - 1];
}

const D = Array.from(new Array(4), () => new Array(N + 1).fill(0));

for (let i = 1; i < 4; i++) {
  for (let j = i * limit; j < N + 1; j++) {
    D[i][j] = Math.max(D[i][j - 1], D[i - 1][j - limit] + P[j] - P[j - limit]);
  }
}

console.log(D[3][N]);
