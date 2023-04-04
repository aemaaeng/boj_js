// 가장 긴 증가하는 부분수열 4
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map((el) => Number(el));

const D = new Array(N).fill(0);
const nums = [];

for (let i = 0; i < N; i++) {
  let max = 0;
  let maxIdx = -1;
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j] && D[j] > max) {
      max = D[j];
      maxIdx = j;
    }
  }
  D[i] = max + 1;
  nums[i] = maxIdx !== -1 ? nums[maxIdx].concat(A[i]) : [A[i]];
}

const answer = Math.max(...D);
console.log(answer);
console.log(nums[D.indexOf(answer)].join(" "));
