// 평범한 배낭
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const w = new Array(N + 1).fill(0);
const v = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  w[i] = +input[i].split(" ")[0];
  v[i] = +input[i].split(" ")[1];
}

const D = Array.from(new Array(N + 1), () => new Array(K + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= K; j++) {
    if (j - w[i] >= 0) {
      D[i][j] = Math.max(D[i - 1][j], D[i - 1][j - w[i]] + v[i]);
    } else {
      D[i][j] = D[i - 1][j];
    }
  }
}

console.log(D[N][K]);
