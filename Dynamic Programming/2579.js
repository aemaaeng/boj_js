const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const S = input.map((el) => Number(el));
const N = S[0];

const D = Array.from(new Array(305), () => new Array(3).fill(0));
D[1][1] = S[1];
D[1][2] = 0;
D[2][1] = S[2];
D[2][2] = S[1] + S[2];

if (N === 1) {
  process.exit(console.log(S[1]));
}

for (let i = 3; i <= N; i++) {
  D[i][1] = Math.max(D[i - 2][1], D[i - 2][2]) + S[i];
  D[i][2] = D[i - 1][1] + S[i];
}

console.log(Math.max(D[N][1], D[N][2]));
