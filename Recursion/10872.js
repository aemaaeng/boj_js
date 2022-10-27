const fs = require("fs");
// TODO: 제출 시 경로 변환 필수 ("/dev/stdin")
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

// 재귀 팩토리얼....
function factorial(N) {
  if (N <= 1) {
    return 1;
  }
  return N * factorial(N - 1);
}

console.log(factorial(N));
