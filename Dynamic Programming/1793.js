// 타일링
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let arr = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

let D = [1n];
D[1] = 1n;
D[2] = 3n;

const result = [];

for (let i = 3; i <= 250; i++) {
  D[i] = D[i - 1] + 2n * D[i - 2];
}

for (const num of arr) {
  result.push(String(D[num]));
}

console.log(result.join("\n"));
