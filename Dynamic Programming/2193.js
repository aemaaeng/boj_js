// 이친수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
const N = Number(fs.readFileSync(filePath).toString().trim());

const D = [];
D[0] = 0;
D[1] = 1;
D[2] = 1;

for (let i = 3; i <= N; i++) {
  D[i] = BigInt(D[i - 1]) + BigInt(D[i - 2]);
}

console.log(String(D[N]));
