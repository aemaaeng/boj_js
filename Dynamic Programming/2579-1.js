const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 밟지 않을 계단의 최솟값을 구한다.
const S = input.map((el) => Number(el));
const N = S[0];

const D = Array.from(new Array(305), () => new Array(3).fill(0));

let total = 0;
for (let i = 1; i <= N; i++) {
  total += S[i];
}

if (N <= 2) {
  process.exit(console.log(total));
}

// 초기값
D[1] = S[1];
D[2] = S[2];
D[3] = S[3];

for (let i = 4; i <= N - 1; i++) {
  D[i] = Math.min(D[i - 2], D[i - 3]) + S[i];
}

console.log(total - Math.min(D[N - 1], D[N - 2]));
