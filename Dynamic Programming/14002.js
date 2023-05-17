const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map((el) => Number(el));

const D = new Array(N).fill(0);
// 수열을 담을 배열
const numbers = new Array(N).fill(0);

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
  // maxIdx가 업데이트 되었다면 수열에 현재 값(A[i])을 덧붙이는 방식으로 numbers 배열을 채워나감
  numbers[i] = maxIdx !== -1 ? numbers[maxIdx].concat(A[i]) : [A[i]];
}

const answer = Math.max(...D);
console.log(answer);
console.log(numbers[D.indexOf(answer)].join(" "));
