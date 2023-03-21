const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = parseInt(fs.readFileSync(filePath).toString().trim());

const D = [0, 0];

for (let i = 2; i <= N; i++) {
  D[i] = D[i - 1] + 1;
  if (i % 2 === 0) D[i] = Math.min(D[i], D[i / 2] + 1);
  if (i % 3 === 0) D[i] = Math.min(D[i], D[i / 3] + 1);
}

console.log(D[N]);
