// 정수 삼각형
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));

const D = [];
for (let i = 0; i < N; i++) {
  D.push(input[i]);
}

let upLeft = 0;
let up = 0;

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i + 1; j++) {
    if (j === 0) upLeft = 0;
    else upLeft = D[i - 1][j - 1];
    if (j === i) up = 0;
    else up = D[i - 1][j];
    D[i][j] = D[i][j] + Math.max(upLeft, up);
  }
}

console.log(Math.max(...D[N - 1]));
