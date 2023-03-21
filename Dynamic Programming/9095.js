const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input.shift());
const nums = input.map((el) => Number(el));
const D = [0, 1, 2, 4];

for (let i = 4; i <= 11; i++) {
  D[i] = D[i - 1] + D[i - 2] + D[i - 3];
}

for (let i = 0; i < T; i++) {
  console.log(D[nums[i]]);
}
