const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const passengers = input[1].split(" ").map((el) => Number(el));
const limit = Number(input[2]);

const P = [0];
for (let i = 1; i < N + 1; i++) {
  P[i] = P[i - 1] + passengers[i - 1];
}

const memo = Array.from(new Array(4), () => new Array(N + 1).fill(0));

for (let i = 1; i <= 3; i++) {
  for (let j = i * limit; j <= N; j++) {
    memo[i][j] = Math.max(
      memo[i][j - 1],
      memo[i - 1][j - limit] + (P[j] - P[j - limit])
    );
  }
}

console.log(memo[3][N]);
