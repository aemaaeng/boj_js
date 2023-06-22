// 동전 2
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const A = [
  ...new Set(
    input
      .slice(1)
      .map(Number)
      .sort((a, b) => a - b)
  ),
];

// D[i] = i원을 만들 때 사용하는 동전의 최소 개수
const D = new Array(K + 1).fill(Infinity);

D[0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = A[i]; j <= K; j++) {
    D[j] = Math.min(D[j], D[j - A[i]] + 1);
  }
}

console.log(D[K] === Infinity ? -1 : D[K]);
