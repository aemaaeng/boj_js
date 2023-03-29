// 백준에서 node.js는 전부 메모리 초과가 남
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const coins = input.slice(1).map((el) => Number(el));

const D = new Array(K + 1).fill(0);
D[0] = 1;

for (let i = 0; i < N; i++) {
  for (let j = coins[i]; j <= K; j++) {
    D[j] += D[j - coins[i]];
  }
}

console.log(D[K]);
