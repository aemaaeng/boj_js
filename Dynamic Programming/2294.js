const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
// 중복 제거 및 정렬
const coins = [
  ...new Set(
    input
      .slice(1)
      .map((el) => Number(el))
      .sort((a, b) => a - b)
  ),
];

const D = new Array(K + 1).fill(Infinity);
D[0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = coins[i]; j <= K; j++) {
    D[j] = Math.min(D[j], D[j - coins[i]] + 1);
  }
}

console.log(D[K] === Infinity ? -1 : D[K]);