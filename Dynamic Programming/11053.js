// 가장 긴 증가하는 부분수열
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map((el) => Number(el));

const D = new Array(N).fill(0); // 부분수열의 길이를 담는 배열

for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j] && D[j] > max) {
      max = D[j];
    }
  }
  D[i] = max + 1;
}

// console.log(D);
console.log(Math.max(...D));
