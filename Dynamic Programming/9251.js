// LCS
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [A, B] = input;
const N = A.length;
const M = B.length;

const D = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (A[i - 1] === B[j - 1]) {
      D[i][j] = D[i - 1][j - 1] + 1;
    } else {
      D[i][j] = Math.max(D[i][j - 1], D[i - 1][j]);
    }
  }
}

console.log(D[N][M]);
